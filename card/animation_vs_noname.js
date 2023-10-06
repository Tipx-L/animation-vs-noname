"use strict";
game.import("card", (lib, game, ui, get, ai, _status) => {
	/**
	 * @type {importCardConfig}
	 */
	const animationVsNoname = {
		name: "animation_vs_noname",
		connect: true,
		card: {
			// Basic
			avn_rotate: {
				type: "basic",
				enable: true,
				filterTarget: true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					target.link();
				},
				chongzhu: true,
				ai: {
					basic: {
						useful: 4,
						value: 4,
						order: 7
					},
					result: {
						target: (player, target) => {
							if (target.isLinked()) {
								if (target.hasSkillTag("link")) return 0;
								const nofire = target.hasSkillTag("nofire"), nothunder = target.hasSkillTag("nothunder");
								if (nofire && nothunder) return 0;
								if (nofire || nothunder) return 0.5;
								return 2;
							}
							if (player.attitudeTo(target) >= 0) return -0.9;
							if (game.hasPlayer(current => player.attitudeTo(current) <= -1 && current != target)) return -0.9;
							return 0;
						}
					}
				}
			},
			avn_move: {
				type: "basic",
				enable: true,
				singleCard: true,
				targetprompt: ["被移动", "目标位置"],
				filterTarget: true,
				filterAddedTarget: () => true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					if (event.addedTarget) game.broadcastAll((player1, player2) => game.swapSeat(player1, player2, true, true), target, event.addedTarget);
				},
				chongzhu: () => game.countPlayer() < 3,
				ai: {
					basic: {
						order: 1,
						value: 6,
						useful: 6
					},
					result: {
						target: (player, target) => {
							if (player.hasUnknown() && target != player.getNext() && target != player.getPrevious()) return 0;
							const distance = Math.pow(get.distance(player, target, "absolute"), 2);
							if (!ui.selected.targets.length) return distance;
							const previousTarget = ui.selected.targets[0];
							if (target == previousTarget.getPrevious()) return 0;
							return Math.min(0, distance - Math.pow(get.distance(player, previousTarget, "absolute"), 2));
						}
					}
				}
			},
			avn_click: {
				nature: ["fire", "thunder", "ice"],
				type: "basic",
				enable: true,
				cardPrompt: card => `出牌阶段，对一名角色使用。你对其造成1点${(nature => {
					if (!nature) return "";
					switch (nature) {
						case "fire": return "火焰";
						case "thunder": return "雷电";
						case "ice": return "冰冻";
					}
					return `${get.translation(nature)}属性`;
				})(card.nature)}伤害。`,
				filterTarget: true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					if (typeof event.baseDamage != "number") event.baseDamage = 1;
					if (typeof event.extraDamage != "number") event.extraDamage = 0;
					target.damage(event.baseDamage + event.extraDamage, get.nature(card));
				},
				ai: {
					canLink: (player, target) => target.isLinked() && !player.hasSkill("jueqing") && !player.hasSkill("gangzhi") && !target.hasSkill("gangzhi"),
					basic: {
						useful: [5, 3, 1],
						value: [5, 3, 1],
						order: 3.05
					},
					result: {
						target: -1.5
					},
					tag: {
						damage: 1,
						natureDamage: card => {
							if (card.nature) return 1;
						},
						fireDamage: card => {
							if (card.nature == "fire") return 1;
						},
						thunderDamage: card => {
							if (card.nature == "thunder") return 1;
						},
						iceDamage: card => {
							if (card.nature == "ice") return 1;
						}
					}
				}
			},
			avn_drag: {
				type: "basic",
				enable: true,
				singleCard: true,
				postAi: targets => targets.length == 1 && targets[0].countCards("j"),
				targetprompt: ["被移动", "目标场上"],
				multicheck: () => game.hasPlayer(current => current.hasCard(card => get.position(card) == "e" ? game.hasPlayer(current2 => current2 != current && current2.canEquip(card)) : game.hasPlayer(current2 => current2 != current && current2.canAddJudge(card)), "ej")),
				filterTarget: (card, player, target) => target.hasCard(card => get.position(card) == "e" ? game.hasPlayer(current => current != target && current.canEquip(card)) : game.hasPlayer(current => current != target && current.canAddJudge(card)), "ej"),
				filterAddedTarget: (card, player, target, preTarget) => preTarget.hasCard(card => get.position(card) == "e" ? target.canEquip(card) : target.canAddJudge(card), "ej"),
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (event.addedTarget) player.choosePlayerCard(target, "ej", `${get.translation(event.name)}：将${get.translation(target)}的场上的一张牌移动至${get.translation(event.addedTarget)}的场上`, true, button => get.effect(_status.event.getParent().addedTarget, button.link), button => {
						const evt = _status.event.getParent();
						return get.position(button.link) == "e" ? evt.addedTarget.canEquip(button.link) : evt.addedTarget.canAddJudge(button.link);
					});
					else event.finish();
					"step 1"
					if (!result.cards?.length) return;
					const resultCard = result.cards[0], name = event.name;
					if (!Array.isArray(player.storage[name])) player.storage[name] = [];
					player.storage[name].push(resultCard);
					const phase = event.getParent("phase");
					if (phase) {
						const avnDragResetSelectedCards = game.createEvent("avnDragResetSelectedCards");
						event.next.remove(avnDragResetSelectedCards);
						phase.after.push(avnDragResetSelectedCards);
						avnDragResetSelectedCards.player = player;
						avnDragResetSelectedCards.skill = name;
						avnDragResetSelectedCards.setContent(() => {
							delete player.storage[skill];
						});
					}
					if (get.position(resultCard) == "e") event.addedTarget.equip(resultCard);
					else {
						target.$give(resultCard, event.addedTarget);
						const name = resultCard.viewAs || resultCard.name;
						if (resultCard.name != name) event.addedTarget.addJudge(name, resultCard);
						else event.addedTarget.addJudge(resultCard);
					}
				},
				ai: {
					basic: {
						order: 10,
						value: 5,
						useful: 5
					},
					result: {
						target: (player, target) => {
							if (player.storage.avn_drag_result) return 0;
							player.storage.avn_drag_result = true;
							if (ui.selected.targets.length) {
								const previousTarget = ui.selected.targets[0], field = previousTarget.getCards("ej", card => !player.getStorage("avn_drag").includes(card) && (get.position(card) == "e" ? target.canEquip(card) : target.canAddJudge(card)));
								if (!field.length) {
									delete player.storage.avn_drag_result;
									return 0;
								}
								const attitude = player.attitudeTo(target);
								if (attitude > 0) {
									const result = Math.max(...field.map(value => get.effect(target, value, player, target)));
									delete player.storage.avn_drag_result;
									return result;
								}
								if (attitude < 0) {
									const result = Math.min(...field.map(value => get.effect(target, value, player, target)));
									delete player.storage.avn_drag_result;
									return result;
								}
								delete player.storage.avn_drag_result;
								return 0;
							}
							const field = target.getCards("ej", card => !player.getStorage("avn_drag").includes(card) && (get.position(card) == "e" ? game.hasPlayer(current => current != target && current.canEquip(card)) : game.hasPlayer(current => current != target && current.canAddJudge(card))));
							if (!field.length) {
								delete player.storage.avn_drag_result;
								return 0;
							}
							const attitude = player.attitudeTo(target);
							delete player.storage.avn_drag_result;
							if (attitude > 0) {
								const result = Math.max(...field.map(value => Math.max(...(get.position(value) == "e" ? game.filterPlayer(current => current != target && current.canEquip(value)) : game.filterPlayer(current => current != target && current.canAddJudge(value))).map(current => get.effect(current, value, player, target) - get.effect(target, value, player, target)))));
								delete player.storage.avn_drag_result;
								return result;
							}
							if (attitude < 0) {
								const result = Math.min(...field.map(value => Math.min(...(get.position(value) == "e" ? game.filterPlayer(current => current != target && current.canEquip(value)) : game.filterPlayer(current => current != target && current.canAddJudge(value))).map(current => get.effect(current, value, player, target) - get.effect(target, value, player, target)))));
								delete player.storage.avn_drag_result;
								return result;
							}
							delete player.storage.avn_drag_result;
							return 0;
						}
					}
				}
			},
			// Trick
			avn_antivirus: {
				type: "trick",
				enable: true,
				savable: true,
				filterTarget: (card, player, target) => target.hp < target.maxHp,
				selectTarget: [1, Infinity],
				defaultYingbianEffect: "draw",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					if (typeof event.baseDamage != "number") event.baseDamage = 1;
					if (typeof event.extraDamage != "number") event.extraDamage = 0;
					target.recover(event.baseDamage + event.extraDamage);
				},
				ai: {
					basic: {
						order: (card, player) => player.hasSkillTag("pretao") ? 5 : 2,
						useful: [8.5, 6, 5, 4],
						value: [8.5, 6, 5, 4]
					},
					result: {
						target: 2
					},
					tag: {
						recover: 1,
						save: 1
					}
				}
			},
			avn_plasma_cannon: {
				type: "trick",
				cardnature: "thunder",
				enable: true,
				cardPrompt: card => `出牌阶段，对一名角色使用。若其场上有牌，你将其场上的所有牌置入弃牌堆，否则你对其造成1点${(nature => {
					if (!nature) return "雷电";
					switch (nature) {
						case "fire": return "火焰";
						case "thunder": return "雷电";
						case "ice": return "冰冻";
					}
					return `${get.translation(nature)}属性`;
				})(card.nature)}伤害。`,
				filterTarget: true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					const cardsInTargetField = target.getCards("ej");
					if (cardsInTargetField.length || card.yingbian_all) target.loseToDiscardpile(cardsInTargetField);
					if (!cardsInTargetField.length || card.yingbian_all) {
						if (typeof event.baseDamage != "number") event.baseDamage = 1;
						if (typeof event.extraDamage != "number") event.extraDamage = 0;
						target.damage(event.baseDamage + event.extraDamage, get.nature(card) || "thunder");
					}
				},
				ai: {
					canLink: (player, target) => target.isLinked() && !player.hasSkill("jueqing") && !player.hasSkill("gangzhi") && !target.hasSkill("gangzhi") && !target.countDiscardableCards(player, "ej"),
					basic: {
						order: 6,
						useful: 6,
						value: 8
					},
					result: {
						target: (player, target) => {
							const targetFieldCards = target.getCards("ej");
							if (!targetFieldCards.length) return -1.5;
							const result = targetFieldCards.reduce((previousValue, currentValue) => {
								if (get.position(currentValue) == "j") previousValue -= get.effect(target, currentValue, player, target);
								else if (get.name(currentValue) == "baiyin" && target.isDamaged() && get.recoverEffect(target, player, target) > 0 && target.hp == 1 && !target.hujia) previousValue += 1.6;
								else previousValue -= get.value(currentValue, target);
								return previousValue;
							}, 0);
							return result < 0 ? -Math.sqrt(-result) : Math.sqrt(result);
						}
					},
					tag: {
						damage: 1,
						natureDamage: card => {
							if (card.nature) return 1;
						},
						thunderDamage: card => {
							if (card.nature == "thunder") return 1;
						},
						loseCard: 1
					}
				}
			},
			avn_clone: {
				type: "trick",
				enable: true,
				selectTarget: -1,
				toself: true,
				filterTarget: lib.filter.isMe,
				modTarget: true,
				defaultYingbianEffect: "draw",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					const name = `${event.name}_skill`;
					target.addTempSkill(name);
					target.addMark(name, 1, false);
				},
				ai: {
					basic: {
						order: (item, player) => Math.min(...player.getCards("hs", card => get.tag(card, "damage") && lib.filter.cardEnabled(card, player) && lib.filter.cardUsable(card, player) && get.order(card) > 0).map(card => get.order(card))) + 0.2,
						useful: (card, i) => i == 0 ? 4 : 1,
						value: (card, player, i) => i == 0 ? 5 : 1
					},
					result: {
						target: (player, target) => target.getUseValue("damage") > 0 && target.hasCard(card => get.tag(card, "damage") && game.hasPlayer(current => target.canUse(card, current, null, true) && get.effect_use(current, card, target, player) > 0 && !current.hasSkillTag("filterDamage", null, {
							player: target,
							card: card
						}) && get.effect(current, card, target, target) > 0)) ? 1.5 : 0
					}
				}
			},
			avn_eraser: {
				type: "trick",
				enable: true,
				postAi: targets => targets.length == 1 && targets[0].countCards("j"),
				filterTarget: (card, player, target) => target.countCards("ej"),
				defaultYingbianEffect: "hit",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.choosePlayerCard(`${get.translation(event.name)}：删除${get.translation(target)}的场上的至多两张牌`, target, "ej", [1, 2]);
					"step 1"
					if (!result.cards?.length) return;
					if (!player.storage.avn_delete) player.storage.avn_delete = true;
					const toDelete = result.cards;
					target.$throw(toDelete);
					const uiClear = game.createEvent("uiClear");
					event.next.remove(uiClear);
					target.lose(toDelete, ui.special, "toStorage", "visible").after.push(uiClear);
					uiClear.setContent(() => {
						game.broadcastAll(ui.clear);
					});
					if (!Array.isArray(_status.avn_delete)) _status.avn_delete = [];
					game.broadcast(avnDelete => _status.avn_delete = avnDelete, _status.avn_delete.addArray(toDelete));
					game.players.forEach(value => {
						if (value.storage.avn_delete) value.markSkill("avn_delete");
					});
					game.log(player, "删除了", target, "的", toDelete);
				},
				ai: {
					basic: {
						order: 9,
						useful: 5,
						value: 5
					},
					result: {
						target: (player, target) => {
							const attitude = player.attitudeTo(target);
							if (attitude > 0) {
								if (target.countCards("j", card => get.effect(target, card.viewAs ? {
									name: card.viewAs
								} : card, target, player) < 0) > 0) return 3;
								if (target.getEquip("baiyin") && target.isDamaged() && get.recoverEffect(target, player, player) > 0 && target.hp == 1 && !target.hujia) return 1.6;
								if (target.countCards("e", card => {
									if (get.position(card) == "e") return get.value(card, target) < 0;
								}) > 0) return 1;
							}
							if (target.hasSkillTag("noe")) return 0;
							const equipCards = target.getCards("e");
							if (equipCards.length == 0 || !equipCards.filter(value => get.value(value, target) > 0).length) return 0;
							if (attitude <= 0 && !target.countCards("he")) return 1.5;
							return -1.5;
						}
					},
					tag: {
						loseCard: 1
					}
				}
			},
			avn_hand_tool: {
				type: "trick",
				global: "avn_hand_tool_skill",
				enable: () => typeof _status.event.getParent("phase")?.skill != "string",
				selectTarget: -1,
				toself: true,
				filterTarget: lib.filter.isMe,
				modTarget: true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target) => {
					target.insertPhase();
				},
				ai: {
					basic: {
						order: 0.5,
						useful: 6,
						value: 4
					},
					result: {
						target: 1
					}
				}
			},
			// Delay
			avn_lasso: {
				type: "delay",
				filterTarget: (card, player, target) => lib.filter.judge(card, player, target),
				judge: card => get.suit(card) == "spade" ? 1 : -2,
				judge2: result => result.bool = result.suit != "spade",
				effect: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (result.bool) player.addTempSkill(`${event.name}_skill`, {
						player: "phaseBeginStart"
					});
				},
				ai: {
					basic: {
						order: 1,
						useful: 1,
						value: 7
					},
					result: {
						target: (player, target) => {
							let result = -target.countCards("h") - 1;
							if (target.isTurnedOver()) result /= 2;
							return result / Math.sqrt(Math.max(get.distance(player, target, "absolute"), 1)) * get.threaten(target, player);
						}
					}
				}
			},
			avn_selection_box: {
				type: "delay",
				filterTarget: (card, player, target) => lib.filter.judge(card, player, target),
				judge: card => {
					const judge = _status.event.player.maxHp / 2 - _status.event.player.hp;
					return get.suit(card) == "diamond" ? -judge / 2 : judge;
				},
				judge2: result => result.bool = result.suit != "diamond",
				effect: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (result.bool) player.addTempSkill(`${event.name}_skill`, {
						player: "phaseBeginStart"
					});
				},
				ai: {
					basic: {
						order: 1,
						useful: 1,
						value: 5
					},
					result: {
						target: (player, target) => {
							let result = target.hp - target.maxHp / 2;
							if (target.isTurnedOver()) result /= 2;
							return result / Math.sqrt(Math.max(get.distance(player, target, "absolute"), 1)) * get.threaten(target, player);
						}
					}
				}
			},
			avn_wings: {
				type: "delay",
				filterTarget: (card, player, target) => lib.filter.judge(card, player, target),
				judge: card => get.suit(card) == "heart" ? -1 : 2,
				judge2: result => result.bool = result.suit != "heart",
				effect: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (result.bool) player.addTempSkill(`${event.name}_skill`, {
						player: "phaseBeginStart"
					});
				},
				ai: {
					basic: {
						order: 1,
						useful: 1,
						value: 8
					},
					result: {
						target: (player, target) => {
							let result = 1.5;
							if (target.isTurnedOver()) result /= 2;
							return result / Math.sqrt(Math.max(get.distance(player, target, "absolute"), 1)) * get.threaten(target, player);
						}
					}
				}
			},
			avn_dropper: {
				type: "delay",
				filterTarget: (card, player, target) => lib.filter.judge(card, player, target),
				judge: card => get.suit(card) == "club" ? 1 : -2,
				judge2: result => result.bool = result.suit != "club",
				effect: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (result.bool) player.addTempSkill(`${event.name}_skill`, {
						player: "phaseBeginStart"
					});
				},
				ai: {
					basic: {
						order: 1,
						useful: 1,
						value: 6
					},
					result: {
						target: (player, target) => {
							let result = -target.countCards("h") - 1;
							if (target.isTurnedOver()) result /= 2;
							return result / Math.sqrt(Math.max(get.distance(player, target, "absolute"), 1)) * get.threaten(target, player);
						}
					}
				}
			},
			// Equip
			avn_brush: {
				type: "equip",
				subtype: "equip1",
				chongzhu: () => game.countPlayer() < 3,
				defaultYingbianEffect: "draw",
				ai: {
					equipValue: () => Math.min(game.countPlayer() / 2, 4),
					basic: {
						equipValue: 3.5
					},
					tag: {
						avn_reach: 2
					}
				}
			},
			avn_card: {
				type: "equip",
				subtype: "equip5",
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 3
					},
					tag: {
						avn_once: 1,
						avn_throwable: 1
					}
				}
			},
			avn_energy_ball: {
				type: "equip",
				subtype: "equip5",
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 5
					},
					tag: {
						avn_reach: 1,
						avn_once: 1,
						avn_throwable: 1,
						avn_cleave: 1
					}
				}
			},
			avn_fire_breath: {
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -1
				},
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 2.5
					},
					tag: {
						avn_undraggable: 1
					}
				},
				skills: ["avn_fire_breath_skill"]
			},
			avn_gun: {
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -3
				},
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 4
					}
				},
				skills: ["avn_gun_skill"]
			},
			avn_laser: {
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -4
				},
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 3
					},
					tag: {
						avn_once: 1,
						avn_undraggable: 1
					}
				}
			},
			avn_magnifying_glass: {
				type: "equip",
				subtype: "equip5",
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 2.5
					},
					tag: {
						avn_once: 1
					}
				},
				skills: ["avn_magnifying_glass_skill"]
			},
			avn_pencil: {
				type: "equip",
				subtype: "equip1",
				chongzhu: () => game.countPlayer() < 3,
				defaultYingbianEffect: "draw",
				ai: {
					equipValue: () => Math.min(game.countPlayer() / 2, 4),
					basic: {
						equipValue: 3.5
					},
					tag: {
						avn_cleave: 1
					}
				}
			},
			avn_sidebar: {
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -2
				},
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 2.5
					},
					tag: {
						avn_throwable: 1
					}
				}
			}
		},
		skill: {
			// Rule
			avn_delete: {
				intro: {
					name: "回收站",
					markcount: () => _status.avn_delete.length,
					mark: dialog => {
						if (_status.avn_delete.length) dialog.addAuto(_status.avn_delete);
						else dialog.add("回收站中没有牌");
					},
					content: () => _status.avn_delete.length ? get.translation(_status.avn_delete) : "回收站中没有牌"
				}
			},
			_avn_reach: {
				equipSkill: true,
				direct: true,
				trigger: {
					player: "useCard2"
				},
				filter: (event, player) => Math.max(...player.getCards("e", card => get.tag(card, "avn_reach")).map(value => get.tag(value, "avn_reach"))) > 0 && ["basic", "trick"].includes(get.type(event.card, null, false)) && game.hasPlayer(current => !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, event.player, current) && event.targets.some(value => current == value.getPrevious() || current == value.getNext())),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const tag = event.name.slice(1);
					const maxReach = Math.max(...player.getCards("e", card => get.tag(card, tag)).map(value => get.tag(value, tag)));
					player.chooseTarget(get.prompt(event.name), `你可以增加${maxReach > 1 ? `至多` : ""}${get.cnNumber(maxReach)}名与任意目标的座次相邻的角色为目标`, [1, maxReach], (card, player, target) => {
						const evt = _status.event.getTrigger();
						return !evt.targets.includes(target) && lib.filter.targetEnabled2(evt.card, evt.player, target) && evt.targets.some(value => target == value.getPrevious() || target == value.getNext());
					}, target => {
						const evt = _status.event.getTrigger();
						return get.effect(target, evt.card, evt.player, _status.event.player);
					}).tag = tag;
					"step 1"
					if (result.targets?.length) {
						event.targets = result.targets;
						if (!event.isMine() && !_status.connectMode) game.delayx();
					}
					else event.finish();
					"step 2"
					player.logSkill(event.name, targets);
					trigger.targets.addArray(targets);
				}
			},
			_avn_once: {
				equipSkill: true,
				direct: true,
				trigger: {
					player: "useCardToTargeted"
				},
				filter: (event, player) => !player.hasHistory("useSkill", evt => evt.skill == "_avn_once") && player.hasCard(card => get.tag(card, "avn_once"), "e") && get.distance(player, event.target) > 1 && event.target.countDiscardableCards(player, "hej"),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					player.discardPlayerCard(`###${get.prompt(event.name, trigger.target)}###你可以弃置${get.translation(trigger.target)}的区域内的一张牌`, trigger.target, "hej").logSkill = [event.name, trigger.target];
				}
			},
			_avn_throwable: {
				equipSkill: true,
				enable: "phaseUse",
				filter: (event, player) => player.hasCard(card => lib.filter.cardDiscardable(card, player) && lib.skill._avn_throwable.filterCard(card), lib.skill._avn_throwable.position) && game.hasPlayer(current => current != player && current != player.getPrevious() && current != player.getNext()),
				position: "e",
				filterCard: card => get.tag(card, "avn_throwable"),
				filterTarget: (card, player, target) => target != player && target != player.getPrevious() && target != player.getNext(),
				check: card => {
					const player = _status.event.player;
					return Math.max(...game.filterPlayer(current => current != player && current != player.getPrevious() && current != player.getNext()).map(value => get.damageEffect(value, player, player))) - get.value(card);
				},
				content: (event, step, source, player, target) => {
					target.damage();
				},
				ai: {
					damage: true,
					order: 1,
					result: {
						target: (player, target) => get.damageEffect(target, player, target)
					}
				}
			},
			_avn_cleave: {
				equipSkill: true,
				direct: true,
				trigger: {
					player: "useCard2"
				},
				filter: (event, player) => player.hasCard(card => get.tag(card, "avn_cleave"), "e") && ["basic", "trick"].includes(get.type(event.card, null, false)) && game.hasPlayer(current => !event.targets.includes(current) && lib.filter.targetEnabled2(event.card, event.player, current) && (current == event.player.getPrevious() || current == event.player.getNext())),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseTarget(get.prompt(event.name), `你可以增加一名与你的座次相邻的角色为目标`, (card, player, target) => {
						const evt = _status.event.getTrigger();
						return !evt.targets.includes(target) && lib.filter.targetEnabled2(evt.card, evt.player, target) && (target == evt.player.getPrevious() || target == evt.player.getNext());
					}, target => {
						const evt = _status.event.getTrigger();
						return get.effect(target, evt.card, evt.player, _status.event.player);
					}).tag = event.name.slice(1);
					"step 1"
					if (result.targets?.length) {
						event.targets = result.targets;
						if (!event.isMine() && !_status.connectMode) game.delayx();
					}
					else event.finish();
					"step 2"
					player.logSkill(event.name, targets);
					trigger.targets.addArray(targets);
				}
			},
			_avn_undraggable: {
				equipSkill: true,
				locked: false,
				mod: {
					canBeDiscarded: card => {
						if (get.tag(card, "avn_undraggable") && get.position(card) == "e") return false;
					},
					canBeGained: card => {
						if (get.tag(card, "avn_undraggable") && get.position(card) == "e") return false;
					}
				}
			},
			// Trick
			avn_clone_skill: {
				cardSkill: true,
				charlotte: true,
				onremove: true,
				intro: {
					content: storage => `你本回合下次造成伤害时，此伤害×${2 ** (storage || 0)}`,
					markcount: storage => 2 ** (storage || 0)
				},
				forced: true,
				trigger: {
					source: "damageBegin1"
				},
				logTarget: "player",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					const power = player.countMark(event.name);
					player.removeSkill(event.name);
					trigger.num *= 2 ** power;
				},
				ai: {
					damageBonus: true
				}
			},
			avn_hand_tool_skill: {
				cardSkill: true,
				forced: true,
				trigger: {
					player: "phaseDrawBegin2"
				},
				filter: event => event.getParent().skill == "avn_hand_tool" && !event.numFixed && event.num > 0,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					trigger.num--;
				}
			},
			// Delay
			avn_lasso_skill: {
				cardSkill: true,
				charlotte: true,
				mark: true,
				intro: {
					content: "直到你的下回合开始，你使用牌时不能指定其他角色为目标"
				},
				mod: {
					playerEnabled: (card, player, target) => {
						if (target != player) return false;
					}
				}
			},
			avn_selection_box_skill: {
				cardSkill: true,
				charlotte: true,
				mark: true,
				intro: {
					content: "直到你的下回合开始，你的手牌上限-2，且其他角色至你的距离+2"
				},
				mod: {
					maxHandcard: (player, num) => num - 2,
					globalTo: (from, to, current) => current + 2
				}
			},
			avn_wings_skill: {
				cardSkill: true,
				charlotte: true,
				mark: true,
				intro: {
					content: "直到你的下回合开始，当你受到伤害时，防止此伤害"
				},
				forced: true,
				trigger: {
					player: "damageBegin4"
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					trigger.cancel();
				},
				ai: {
					effect: {
						target: card => {
							if (get.tag(card, "damage")) return "zeroplayertarget";
						}
					}
				}
			},
			avn_dropper_skill: {
				cardSkill: true,
				charlotte: true,
				mark: true,
				intro: {
					content: "直到你的下回合开始，当你造成伤害时，防止此伤害"
				},
				forced: true,
				trigger: {
					source: "damageBegin2"
				},
				logTarget: "player",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					trigger.cancel();
				},
				ai: {
					effect: {
						player: card => {
							if (get.tag(card, "damage")) return "zeroplayertarget";
						}
					}
				}
			},
			// Equip
			avn_fire_breath_skill: {
				equipSkill: true,
				mod: {
					cardnature: () => "fire"
				}
			},
			avn_gun_skill: {
				equipSkill: true,
				usable: 1,
				trigger: {
					source: "damageSource"
				},
				filter: event => event.player.isIn(),
				logTarget: "player",
				check: (event, player) => player.attitudeTo(event.player) < 0,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					if (trigger.player != player) player.addExpose(0.2);
					trigger.player.addTempSkill(`${event.name}_effect`, {
						player: ["changeHp", "phaseBeginStart"]
					});
				}
			},
			avn_gun_skill_effect: {
				equipSkill: true,
				charlotte: true,
				mark: true,
				intro: {
					content: "直到你的体力值变化时或你的下回合开始，你不能使用或打出手牌"
				},
				mod: {
					cardEnabled2: card => {
						if (get.position(card) == "h") return false;
					}
				}
			},
			avn_magnifying_glass_skill: {
				equipSkill: true,
				delay: false,
				enable: "phaseUse",
				usable: 1,
				filterTarget: true,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.choosePlayerCard(target, "h", `${get.skillTranslation(event.name, player)}：观看${get.translation(target)}的一张手牌`, true);
					"step 1"
					if (result.cards?.length) player.viewCards(`${get.skillTranslation(event.name, player)}：${get.translation(target)}的${get.translation(result.cards)}`, result.cards);
					"step 2"
					game.delayx();
				},
				ai: {
					order: 10,
					result: {
						target: (player, target) => target.countCards("h") && -Math.sqrt(-Math.min(player.attitudeTo(target), 0))
					}
				}
			}
		},
		translate: {
			// Rule
			get _avn_reach() {
				return lib.translate.avn_reach;
			},
			_avn_reach_info: "当你使用基本牌或普通锦囊牌选择目标后，若你的装备区内有带有「延伸」标签的牌，你可以增加至多最大「延伸」值名与任意目标的座次相邻的角色为目标。",
			get _avn_once() {
				return lib.translate.avn_once;
			},
			_avn_once_info: "每回合限一次，当你使用牌指定距离大于1的角色为目标后，若你的装备区内有带有「一次」标签的牌，你可以弃置其区域内的一张牌。",
			get _avn_throwable() {
				return lib.translate.avn_throwable;
			},
			_avn_throwable_info: "出牌阶段，你可以弃置装备区内的一张带有「可抛」标签的牌，对一名与你的座次不相邻的其他角色造成1点伤害。",
			get _avn_cleave() {
				return lib.translate.avn_cleave;
			},
			_avn_cleave_info: "当你使用基本牌或普通锦囊牌选择目标后，若你的装备区内有带有「劈开」标签的牌，你可以增加一名与你的座次相邻的角色为目标。",
			get _avn_undraggable() {
				return lib.translate.avn_undraggable;
			},
			_avn_undraggable_info: "你的装备区内的带有「不动」标签的牌不能被弃置或获得。",
			avn_reach: "延伸",
			avn_reach_info: "当你使用基本牌或普通锦囊牌选择目标后，你可以增加一名与任意目标的座次相邻的角色为目标。",
			avn_reach_2: "延伸2",
			avn_reach_2_info: "当你使用基本牌或普通锦囊牌选择目标后，你可以增加至多两名与任意目标的座次相邻的角色为目标。",
			avn_once: "一次",
			avn_once_info: "每回合限一次，当你使用牌指定距离大于1的角色为目标后，你可以弃置其区域内的一张牌。",
			avn_throwable: "可抛",
			avn_throwable_info: "出牌阶段，你可以弃置装备区内的此牌，对一名与你的座次不相邻的其他角色造成1点伤害。",
			avn_cleave: "劈开",
			avn_cleave_info: "当你使用基本牌或普通锦囊牌选择目标后，你可以增加一名与你的座次相邻的角色为目标。",
			avn_undraggable: "不动",
			avn_undraggable_info: "你的装备区内的此牌不能被弃置或获得。",
			// Basic
			avn_rotate: "旋转",
			avn_rotate_info: "此牌可被重铸。<br>出牌阶段，对一名角色使用。其横置或重置。",
			avn_move: "移动",
			avn_move_info: "当存活角色数小于3时，此牌可被重铸。<br>出牌阶段，对一名角色使用。其将座位移动至你指定的另一名角色的上家之后。",
			avn_click: "点击",
			avn_click_info: "出牌阶段，对一名角色使用。你对其造成1点伤害。",
			avn_drag: "拖拽",
			avn_drag_info: "出牌阶段，对一名场上有牌的角色使用。你将其场上的一张牌移动至你指定的另一名角色的场上。",
			// Trick
			avn_antivirus: "杀毒软件",
			avn_antivirus_info: "出牌阶段，对任意名体力小于体力上限的角色使用。其回复1点体力。<br>当有角色处于濒死状态时，对其使用。其回复1点体力。",
			avn_plasma_cannon: "等离子炮",
			avn_plasma_cannon_info: "出牌阶段，对一名角色使用。若其场上有牌，你将其场上的所有牌置入弃牌堆，否则你对其造成1点雷电伤害。",
			avn_clone: "克隆",
			avn_clone_skill: "克隆",
			avn_clone_info: "出牌阶段，对包含你在内的一名角色使用。其本回合下次造成伤害时，此伤害×2。",
			avn_eraser: "橡皮擦",
			avn_eraser_info: "出牌阶段，对一名场上有牌的角色使用。你删除其场上的至多两张牌。",
			avn_hand_tool: "抓手工具",
			avn_hand_tool_info: "出牌阶段，当本回合不为额外回合时，对包含你在内的一名角色使用。其于本回合后执行一个摸牌阶段少摸一张牌的额外回合。",
			// Delay
			avn_lasso: "套索",
			get avn_lasso_skill() {
				return lib.translate.avn_lasso;
			},
			avn_lasso_info: "出牌阶段，对一名角色使用。若判定结果不为♠，直到其下回合开始，其使用牌时不能指定其他角色为目标。",
			avn_selection_box: "选框",
			get avn_selection_box_skill() {
				return lib.translate.avn_selection_box;
			},
			avn_selection_box_info: "出牌阶段，对一名角色使用。若判定结果不为♦，直到其下回合开始，其手牌上限-2，且除其以外的角色至其距离+2。",
			avn_wings: "翅膀",
			get avn_wings_skill() {
				return lib.translate.avn_wings;
			},
			avn_wings_info: "出牌阶段，对一名角色使用。若判定结果不为♥，直到其下回合开始，当其受到伤害时，防止此伤害。",
			avn_dropper: "吸管",
			get avn_dropper_skill() {
				return lib.translate.avn_dropper;
			},
			avn_dropper_info: "出牌阶段，对一名角色使用。若判定结果不为♣，直到其下回合开始，当其造成伤害时，防止此伤害。",
			// Equip
			avn_brush: "画笔",
			get avn_brush_info() {
				return `当存活角色数小于3时，此牌可被重铸。<br>${lib.translate.avn_reach_2}：${lib.translate.avn_reach_2_info}`;
			},
			avn_card: "纸牌",
			get avn_card_info() {
				return `${lib.translate.avn_once}：${lib.translate.avn_once_info}<br>${lib.translate.avn_throwable}：${lib.translate.avn_throwable_info}`;
			},
			avn_energy_ball: "能量球",
			get avn_energy_ball_info() {
				return `${lib.translate.avn_reach}：${lib.translate.avn_reach_info}<br>${lib.translate.avn_once}：${lib.translate.avn_once_info}<br>${lib.translate.avn_throwable}：${lib.translate.avn_throwable_info}<br>${lib.translate.avn_cleave}：${lib.translate.avn_cleave_info}`;
			},
			avn_fire_breath: "火焰气息",
			get avn_fire_breath_info() {
				return `${lib.translate.avn_fire_breath_skill_info}<br>${lib.translate.avn_undraggable}：${lib.translate.avn_undraggable_info}`;
			},
			get avn_fire_breath_skill() {
				return lib.translate.avn_fire_breath;
			},
			avn_fire_breath_skill_info: "锁定技，你的区域内的牌和判定牌的属性均视为火焰。",
			avn_gun: "枪",
			get avn_gun_info() {
				return lib.translate.avn_gun_skill_info;
			},
			get avn_gun_skill() {
				return lib.translate.avn_gun;
			},
			get avn_gun_skill_effect() {
				return lib.translate.avn_gun;
			},
			avn_gun_skill_info: "每回合限一次，当你对一名角色造成伤害后，你可以令其不能使用或打出手牌直到其体力值变化时或其下回合开始。",
			avn_laser: "激光",
			get avn_laser_info() {
				return `${lib.translate.avn_once}：${lib.translate.avn_once_info}<br>${lib.translate.avn_undraggable}：${lib.translate.avn_undraggable_info}`;
			},
			avn_magnifying_glass: "放大镜",
			get avn_magnifying_glass_info() {
				return `${lib.translate.avn_magnifying_glass_skill_info}<br>${lib.translate.avn_once}：${lib.translate.avn_once_info}`;
			},
			get avn_magnifying_glass_skill() {
				return lib.translate.avn_magnifying_glass;
			},
			avn_magnifying_glass_skill_info: "出牌阶段限一次，你可以观看一名角色的一张手牌。",
			avn_pencil: "铅笔",
			get avn_pencil_info() {
				return `当存活角色数小于3时，此牌可被重铸。<br>${lib.translate.avn_cleave}：${lib.translate.avn_cleave_info}`;
			},
			avn_sidebar: "侧边栏",
			get avn_sidebar_info() {
				return `${lib.translate.avn_throwable}：${lib.translate.avn_throwable_info}`;
			},
			// Tag
			get avn_reach_tag() {
				return lib.translate.avn_reach;
			},
			get avn_reach_2_tag() {
				return lib.translate.avn_reach_2;
			},
			get avn_once_tag() {
				return lib.translate.avn_once;
			},
			get avn_throwable_tag() {
				return lib.translate.avn_throwable;
			},
			get avn_cleave_tag() {
				return lib.translate.avn_cleave;
			},
			get avn_undraggable_tag() {
				return lib.translate.avn_undraggable;
			},
		},
		list: [
			// Basic
			["club", 1, "avn_rotate"],
			["club", 2, "avn_rotate"],
			["club", 3, "avn_rotate"],
			["club", 4, "avn_rotate"],
			["club", 5, "avn_rotate"],
			["club", 9, "avn_rotate"],
			["club", 10, "avn_rotate"],
			["club", 11, "avn_rotate"],
			["club", 12, "avn_rotate"],
			["club", 13, "avn_rotate"],
			["heart", 6, "avn_move"],
			["heart", 7, "avn_move"],
			["heart", 8, "avn_move"],
			["heart", 9, "avn_move"],
			["heart", 10, "avn_move"],
			["spade", 4, "avn_click"],
			["spade", 5, "avn_click"],
			["spade", 6, "avn_click", "thunder"],
			["spade", 7, "avn_click", "fire"],
			["spade", 8, "avn_click", "ice"],
			["diamond", 8, "avn_drag"],
			["diamond", 9, "avn_drag"],
			["diamond", 10, "avn_drag"],
			["diamond", 11, "avn_drag"],
			["diamond", 12, "avn_drag"],
			// Trick
			["heart", 1, "avn_antivirus"],
			["heart", 13, "avn_antivirus"],
			["spade", 9, "avn_plasma_cannon", "thunder"],
			["spade", 10, "avn_plasma_cannon", "thunder"],
			["club", 8, "avn_clone"],
			["diamond", 3, "avn_clone"],
			["diamond", 6, "avn_eraser"],
			["diamond", 7, "avn_eraser"],
			["spade", 12, "avn_hand_tool"],
			["spade", 13, "avn_hand_tool"],
			// Delay
			["spade", 1, "avn_lasso"],
			["spade", 2, "avn_lasso"],
			["diamond", 4, "avn_selection_box"],
			["diamond", 5, "avn_selection_box"],
			["heart", 11, "avn_wings"],
			["heart", 12, "avn_wings"],
			["club", 6, "avn_dropper"],
			["club", 7, "avn_dropper"],
			// Equip
			["heart", 4, "avn_brush", null, ["avn_reach_2"]],
			["heart", 5, "avn_card", null, ["avn_once", "avn_throwable"]],
			["diamond", 13, "avn_energy_ball", null, ["avn_reach", "avn_once", "avn_throwable", "avn_cleave"]],
			["diamond", 2, "avn_fire_breath", null, ["avn_undraggable"]],
			["spade", 11, "avn_gun"],
			["diamond", 1, "avn_laser", null, ["avn_once", "avn_undraggable"]],
			["spade", 3, "avn_magnifying_glass", null, ["avn_once"]],
			["heart", 3, "avn_pencil", null, ["avn_cleave"]],
			["heart", 2, "avn_sidebar", null, ["avn_throwable"]]
		]
	};
	const fileSystemAvailable = Boolean(game.download);
	if (!lib.decade_extCardImage) lib.decade_extCardImage = {};
	Object.entries(animationVsNoname.card).forEach(([key, value]) => {
		if (fileSystemAvailable) {
			value.audio = "ext:桌面大战/audio/card:mp3";
			value.image = `ext:桌面大战/image/card/${key}.webp`;
		}
		else {
			value.audio = "db:extension-桌面大战:audio/card:mp3";
			value.image = `db:extension-桌面大战:image/card/${key}.webp`;
		}
		value.fullskin = true;
		lib.decade_extCardImage[key] = `${lib.assetURL}extension/桌面大战/image/decade_extCardImage/${key}.webp`;
		const nature = value.nature;
		if (nature) nature.forEach(element => lib.decade_extCardImage[`${key}_${element}`] = `${lib.assetURL}extension/桌面大战/image/decade_extCardImage/${key}_${element}.webp`);
	});
	Object.values(animationVsNoname.skill).forEach(value => value.audio = false);
	return animationVsNoname;
});
