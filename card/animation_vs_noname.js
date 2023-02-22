"use strict";
game.import("card", (lib, game, ui, get, ai, _status) => {
	/**
	 * @type {importCardConfig}
	 */
	const ANIMATION_VS_NONAME = {
		name: "animation_vs_noname",
		connect: true,
		card: {
			// Basic
			avn_rotate: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "basic",
				enable: true,
				filterTarget: true,
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_draw")) str += "当你声明使用此牌时，你摸一张牌";
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
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
							if (get.attitude(player, target) >= 0) return -0.9;
							if (game.hasPlayer(current => get.attitude(player, current) <= -1 && current != target)) return -0.9;
							return 0;
						}
					}
				}
			},
			avn_move: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "basic",
				enable: true,
				singleCard: true,
				targetprompt: ["被移动", "目标位置"],
				filterTarget: true,
				filterAddedTarget: () => true,
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_draw")) str += "当你声明使用此牌时，你摸一张牌";
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (event.addedTarget) game.broadcastAll((player1, player2) => game.swapSeat(player1, player2, true, true), target, event.addedTarget);
				},
				chongzhu: () => game.countPlayer() <= 2,
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
							if (target.getPrevious() == previousTarget) return 0;
							return Math.min(0, distance - Math.pow(get.distance(player, previousTarget, "absolute"), 2));
						}
					}
				}
			},
			avn_click: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
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
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_damage")) str += "此牌的伤害值基数+1";
					if (get.cardtag(card, "yingbian_draw")) {
						if (str.length) str += "；";
						str += "当你声明使用此牌时，你摸一张牌";
					}
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["damage", "draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_damage")) {
						bool = true;
						if (typeof event.baseDamage == "number") event.baseDamage++;
						else event.baseDamage = 2;
						game.log(card, "的伤害值基数+1");
					}
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "basic",
				enable: true,
				singleCard: true,
				postAi: targets => targets.length == 1,
				targetprompt: ["被移动", "目标场上"],
				multicheck: () => game.hasPlayer(current => current.hasCard(card => game.hasPlayer(current2 => current2 != current && get.position(card) == "e" ? current2.canEquip(card) : current2.canAddJudge(card)), "ej")),
				filterTarget: (card, player, target) => target.hasCard(card => game.hasPlayer(current => current != target && get.position(card) == "e" ? current.canEquip(card) : current.canAddJudge(card)), "ej"),
				filterAddedTarget: (card, player, target, preTarget) => preTarget.hasCard(card => get.position(card) == "e" ? target.canEquip(card) : target.canAddJudge(card), "ej"),
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_draw")) str += "当你声明使用此牌时，你摸一张牌";
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (event.addedTarget) player.choosePlayerCard(target, "ej", `${get.translation(event.name)}：将${get.translation(target)}的场上的一张牌移动至${get.translation(event.addedTarget)}的场上`, true).set("filterButton", button => {
						const evt = _status.event.getParent();
						return get.position(button.link) == "e" ? evt.addedTarget.canEquip(button.link) : evt.addedTarget.canAddJudge(button.link);
					}).ai = button => get.effect(_status.event.getParent().addedTarget, button.link, _status.event.player, _status.event.player);
					else event.finish();
					"step 1"
					if (result.cards?.length) {
						const card = result.cards[0], name = event.name;
						if (!Array.isArray(player.storage[name])) player.storage[name] = [];
						player.storage[name].push(card);
						const phase = event.getParent("phase");
						if (phase?.name == "phase") {
							const next = game.createEvent("avnDragResetSelectedCards");
							event.next.remove(next);
							phase.after.push(next);
							next.player = player;
							next.skill = name;
							next.setContent(() => {
								delete player.storage[skill];
							});
						}
						if (get.position(card) == "e") event.addedTarget.equip(card);
						else {
							target.$give(card, event.addedTarget);
							const name = card.viewAs || card.name;
							if (card.name != name) event.addedTarget.addJudge(name, card);
							else event.addedTarget.addJudge(card);
						}
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
								const previousTarget = ui.selected.targets[0], field = previousTarget.getCards("ej", card => !player.getStorage("avn_drag").contains(card) && (get.position(card) == "e" ? target.canEquip(card) : target.canAddJudge(card)));
								if (!field.length) {
									delete player.storage.avn_drag_result;
									return 0;
								}
								const attitude = get.attitude(player, target);
								if (attitude > 0) {
									const result = Math.max(...field.map(value => get.effect(target, value, player, target) - get.effect(previousTarget, value, player, target)));
									delete player.storage.avn_drag_result;
									return result;
								}
								if (attitude < 0) {
									const result = Math.min(...field.map(value => get.effect(target, value, player, target) - get.effect(previousTarget, value, player, target)));
									delete player.storage.avn_drag_result;
									return result;
								}
								delete player.storage.avn_drag_result;
								return 0;
							}
							const field = target.getCards("ej", card => !player.getStorage("avn_drag").contains(card) && game.hasPlayer(current => current != target && (get.position(card) == "e" ? current.canEquip(card) : current.canAddJudge(card))));
							if (!field.length) {
								delete player.storage.avn_drag_result;
								return 0;
							}
							const attitude = get.attitude(player, target);
							delete player.storage.avn_drag_result;
							if (attitude > 0) {
								const result = Math.max(...field.map(value => Math.max(...game.filterPlayer(current => current != target && (get.position(value) == "e" ? current.canEquip(value) : current.canAddJudge(value))).map(current => get.effect(current, value, player, target) - get.effect(target, value, player, target)))));
								delete player.storage.avn_drag_result;
								return result;
							}
							if (attitude < 0) {
								const result = Math.min(...field.map(value => Math.min(...game.filterPlayer(current => current != target && (get.position(value) == "e" ? current.canEquip(value) : current.canAddJudge(value))).map(current => get.effect(current, value, player, target) - get.effect(target, value, player, target)))));
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "trick",
				cardnature: "fire",
				enable: true,
				cardPrompt: card => `出牌阶段，对一名角色使用。你对其造成1点${!card.nature || card.nature == "fire" ? "火焰" : get.translation(card.nature)}${card.nature && card.nature != "fire" ? "属性" : ""}伤害，然后你回复1点体力。`,
				filterTarget: true,
				selectTarget: [1, 2],
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_damage")) str += "此牌的伤害值基数+1";
					if (get.cardtag(card, "yingbian_hit")) {
						if (str.length) str += "；";
						str += "此牌不可被响应";
					}
					if (get.cardtag(card, "yingbian_draw")) {
						if (str.length) str += "；";
						str += "当你声明使用此牌时，你摸一张牌";
					}
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["damage", "hit", "draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_damage")) {
						bool = true;
						if (typeof event.baseDamage == "number") event.baseDamage++;
						else event.baseDamage = 2;
						game.log(card, "的伤害值基数+1");
					}
					if (get.cardtag(card, "yingbian_hit")) {
						bool = true;
						event.directHit.addArray(game.players);
						game.log(card, "不可被响应");
					}
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (typeof event.baseDamage != "number") event.baseDamage = 1;
					if (typeof event.extraDamage != "number") event.extraDamage = 0;
					const damageAmount = event.baseDamage + event.extraDamage;
					target.damage(damageAmount, get.nature(card) || "fire");
				},
				ai: {
					canLink: (player, target) => target.isLinked() && !player.hasSkill("jueqing") && !player.hasSkill("gangzhi") && !target.hasSkill("gangzhi"),
					basic: {
						order: 4,
						useful: 6,
						value: 6
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
						}
					}
				}
			},
			avn_plasma_cannon: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "trick",
				cardnature: "thunder",
				enable: true,
				baseDamage: 2,
				cardPrompt: card => `出牌阶段，对一名角色使用。若其场上有能被你弃置的牌，你弃置其场上的所有牌，否则你对其造成2点${!card.nature || card.nature == "thunder" ? "雷电" : get.translation(card.nature)}${card.nature && card.nature != "fire" ? "属性" : ""}伤害。`,
				filterTarget: true,
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_damage")) str += "此牌的伤害值基数+1";
					if (get.cardtag(card, "yingbian_hit")) {
						if (str.length) str += "；";
						str += "此牌不可被响应";
					}
					if (get.cardtag(card, "yingbian_all")) {
						if (str.length) str += "；";
						str += "此牌的效果改为依次执行所有选项";
					}
					if (get.cardtag(card, "yingbian_draw")) {
						if (str.length) str += "；";
						str += "当你声明使用此牌时，你摸一张牌";
					}
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["damage", "hit", "all", "draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_damage")) {
						bool = true;
						if (typeof event.baseDamage == "number") event.baseDamage++;
						else event.baseDamage = 3;
						game.log(card, "的伤害值基数+1");
					}
					if (get.cardtag(card, "yingbian_hit")) {
						bool = true;
						event.directHit.addArray(game.players);
						game.log(card, "不可被响应");
					}
					if (get.cardtag(card, "yingbian_all")) {
						bool = true;
						card.yingbian_all = true;
						game.log(card, "执行所有选项");
					}
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					const cardsCanBeDiscardedInTheTargetField = target.getDiscardableCards(player, "ej");
					if (cardsCanBeDiscardedInTheTargetField.length || card.yingbian_all) target.discard(cardsCanBeDiscardedInTheTargetField, "notBySelf");
					if (!cardsCanBeDiscardedInTheTargetField.length || card.yingbian_all) {
						if (typeof event.baseDamage != "number") event.baseDamage = 2;
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
						target: (player, target, card) => {
							const cardsCanBeDiscardedInTheTargetField = target.getDiscardableCards(player, "ej");
							if (cardsCanBeDiscardedInTheTargetField.length) {
								const result = cardsCanBeDiscardedInTheTargetField.reduce((previousValue, currentValue) => {
									if (get.position(currentValue) == "j") previousValue -= get.effect(target, currentValue, player, target);
									else if (get.name(currentValue) == "baiyin" && target.isDamaged() && get.recoverEffect(target, player, target) > 0 && target.hp == 1 && !target.hujia) previousValue += 1.6;
									else previousValue -= get.value(currentValue, target);
									return previousValue;
								}, 0);
								return result < 0 ? -Math.sqrt(-result) : Math.sqrt(result);
							}
							return target.hasSkillTag("filterDamage", null, {
								player: player,
								card: card
							}) ? -1.5 : -3;
						}
					},
					tag: {
						damage: 2,
						natureDamage: card => {
							if (card.nature) return 2;
						},
						thunderDamage: card => {
							if (card.nature == "thunder") return 2;
						},
						loseCard: 1
					}
				}
			},
			avn_clone: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "trick",
				enable: true,
				selectTarget: -1,
				toself: true,
				filterTarget: lib.filter.isMe,
				modTarget: true,
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_hit")) str += "此牌不可被响应";
					if (get.cardtag(card, "yingbian_draw")) {
						if (str.length) str += "；";
						str += "当你声明使用此牌时，你摸一张牌";
					}
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["hit", "draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_hit")) {
						bool = true;
						event.directHit.addArray(game.players);
						game.log(card, "不可被响应");
					}
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					const name = `${event.name}_effect`;
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
						target: (player, target) => target.getUseValue("damage") > 0 && target.hasCard(card => get.tag(card, "damage") && lib.filter.cardEnabled(card, player) && lib.filter.cardUsable(card, player) && target.getUseValue(card) > 0) ? 1.5 : 0
					}
				}
			},
			avn_eraser: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "trick",
				enable: true,
				postAi: targets => targets.length == 1,
				filterTarget: (card, player, target) => target.countDiscardableCards(player, "ej"),
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_hit")) str += "此牌不可被响应";
					if (get.cardtag(card, "yingbian_draw")) {
						if (str.length) str += "；";
						str += "当你声明使用此牌时，你摸一张牌";
					}
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["hit", "draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_hit")) {
						bool = true;
						event.directHit.addArray(game.players);
						game.log(card, "不可被响应");
					}
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					player.discardPlayerCard(`${get.translation(event.name)}：弃置${get.translation(target)}的场上的一张牌`, target, "ej", true);
				},
				ai: {
					basic: {
						order: 9,
						useful: 5,
						value: 5
					},
					result: {
						target: (player, target) => {
							const attitude = get.attitude(player, target);
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
						loseCard: 1,
						discard: 1
					}
				}
			},
			avn_hand_tool: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "trick",
				enable: true,
				selectTarget: -1,
				toself: true,
				filterTarget: lib.filter.isMe,
				modTarget: true,
				yingbian_prompt: card => {
					let str = "";
					if (get.cardtag(card, "yingbian_hit")) str += "此牌不可被响应";
					if (get.cardtag(card, "yingbian_draw")) {
						if (str.length) str += "；";
						str += "当你声明使用此牌时，你摸一张牌";
					}
					if (!str.length || get.cardtag(card, "yingbian_add")) {
						if (str.length) str += "；";
						str += "当你使用此牌选择目标后，你可为此牌增加一个目标";
					}
					return str;
				},
				yingbian_tags: ["hit", "draw", "add"],
				yingbian: event => {
					const card = event.card;
					let bool = false;
					if (get.cardtag(card, "yingbian_hit")) {
						bool = true;
						event.directHit.addArray(game.players);
						game.log(card, "不可被响应");
					}
					if (get.cardtag(card, "yingbian_draw")) {
						bool = true;
						event.player.draw();
					}
					if (!bool || get.cardtag(card, "yingbian_add")) event.yingbian_addTarget = true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "delay",
				filterTarget: (card, player, target) => lib.filter.judge(card, player, target),
				judge: card => get.suit(card) == "spade" ? 1 : -2,
				judge2: result => result.bool = result.suit != "spade",
				effect: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (result.bool) player.addTempSkill(`${event.name}_effect`, {
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "delay",
				filterTarget: (card, player, target) => lib.filter.judge(card, player, target),
				judge: card => {
					const judge = _status.event.player.maxHp / 2 - _status.event.player.hp;
					return get.suit(card) == "diamond" ? -judge / 2 : judge;
				},
				judge2: result => result.bool = result.suit != "diamond",
				effect: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (result.bool) player.addTempSkill(`${event.name}_effect`, {
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
							let result = target.maxHp / 2 - target.hp;
							if (target.isTurnedOver()) result /= 2;
							return result / Math.sqrt(Math.max(get.distance(player, target, "absolute"), 1)) * get.threaten(target, player);
						}
					}
				}
			},
			avn_wings: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "delay",
				filterTarget: (card, player, target) => lib.filter.judge(card, player, target),
				judge: card => get.suit(card) == "heart" ? -1 : 2,
				judge2: result => result.bool = result.suit != "heart",
				effect: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (result.bool) player.addTempSkill(`${event.name}_effect`, {
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "delay",
				filterTarget: (card, player, target) => lib.filter.judge(card, player, target),
				judge: card => get.suit(card) == "club" ? 1 : -2,
				judge2: result => result.bool = result.suit != "club",
				effect: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					if (result.bool) player.addTempSkill(`${event.name}_effect`, {
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				chongzhu: () => game.countPlayer() <= 3,
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -4
				},
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -4
				},
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -1
				},
				ai: {
					basic: {
						equipValue: 2.5
					},
					tag: {
						avn_not_draggable: 1
					}
				},
				skills: ["avn_fire_breath_skill"]
			},
			avn_gun: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -2
				},
				ai: {
					basic: {
						equipValue: 4
					}
				},
				skills: ["avn_gun_skill"]
			},
			avn_laser: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -4
				},
				ai: {
					basic: {
						equipValue: 3
					},
					tag: {
						avn_once: 1,
						avn_not_draggable: 1
					}
				}
			},
			avn_magnifying_glass: {
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip5",
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				chongzhu: () => game.countPlayer() <= 2,
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
				audio: "ext:桌面大战/audio/card",
				fullskin: true,
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -3
				},
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
			_avn_reach: {
				ruleSkill: true,
				direct: true,
				trigger: {
					player: "useCard2"
				},
				filter: (event, player) => {
					if (event.targets.length != 1) return false;
					const type = get.type(event.card, null, false);
					if (type != "basic" && type != "trick") return false;
					const target = event.targets[0];
					if (target == event.player) return false;
					const maxReach = Math.max(...player.getCards("e", card => get.tag(card, "avn_reach")).map(value => get.tag(value, "avn_reach")));
					if (maxReach <= 0) return false;
					const leftPlayers = [], rightPlayers = [], leftPlayersToTarget = [], rightPlayersToTarget = [];
					let leftPlayer = player, rightPlayer = player, hasNotReachedTargetFromLeft = true, hasNotReachedTargetFromRight = true;
					while (!leftPlayers.contains(rightPlayer.getNext()) && !rightPlayers.contains(leftPlayer.getPrevious())) {
						leftPlayers.push(leftPlayer = leftPlayer.getPrevious());
						if (leftPlayer == target) hasNotReachedTargetFromLeft = false;
						else if (hasNotReachedTargetFromLeft) leftPlayersToTarget.push(leftPlayer);
						rightPlayers.push(rightPlayer = rightPlayer.getNext());
						if (rightPlayer == target) hasNotReachedTargetFromRight = false;
						else if (hasNotReachedTargetFromRight) rightPlayersToTarget.push(leftPlayer);
					}
					leftPlayers.removeArray(leftPlayersToTarget);
					leftPlayers.remove(target);
					if (leftPlayers.length > maxReach) leftPlayers.length = maxReach;
					rightPlayers.removeArray(rightPlayersToTarget);
					rightPlayers.remove(target);
					if (rightPlayers.length > maxReach) rightPlayers.length = maxReach;
					if (![...leftPlayers, ...rightPlayers].some(value => value == target.getPrevious() || value == target.getNext())) return false;
					return game.hasPlayer(current => current != target && lib.filter.targetEnabled2(event.card, event.player, current) && (leftPlayers.contains(current) || rightPlayers.contains(current)));
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const originalTarget = trigger.targets[0], leftPlayers = [], rightPlayers = [], leftPlayersToTarget = [], rightPlayersToTarget = [];
					let leftPlayer = player, rightPlayer = player, hasNotReachedTargetFromLeft = true, hasNotReachedTargetFromRight = true;
					while (!leftPlayers.contains(rightPlayer.getNext()) && !rightPlayers.contains(leftPlayer.getPrevious())) {
						leftPlayers.push(leftPlayer = leftPlayer.getPrevious());
						if (leftPlayer == originalTarget) hasNotReachedTargetFromLeft = false;
						else if (hasNotReachedTargetFromLeft) leftPlayersToTarget.push(leftPlayer);
						rightPlayers.push(rightPlayer = rightPlayer.getNext());
						if (rightPlayer == originalTarget) hasNotReachedTargetFromRight = false;
						else if (hasNotReachedTargetFromRight) rightPlayersToTarget.push(rightPlayer);
					}
					leftPlayers.removeArray(leftPlayersToTarget);
					leftPlayers.remove(originalTarget);
					const name = event.name.slice(1);
					const maxReach = Math.max(...player.getCards("e", card => get.tag(card, name)).map(value => get.tag(value, name)));
					if (leftPlayers.length > maxReach) leftPlayers.length = maxReach;
					rightPlayers.removeArray(rightPlayersToTarget);
					rightPlayers.remove(originalTarget);
					if (rightPlayers.length > maxReach) rightPlayers.length = maxReach;
					player.chooseCardTarget({
						position: "e",
						filterCard: (card, player) => lib.filter.cardDiscardable(card, player) && get.tag(card, _status.event.tag) && get.tag(card, "avn_once"),
						selectCard: () => _status.event.player.hasCard(card => lib.filter.cardDiscardable(card, _status.event.player) && get.tag(card, _status.event.tag) && get.tag(card, "avn_once"), "e") ? 1 : 0,
						filterTarget: (card, player, target) => _status.event.targets.contains(target) && [...ui.selected.targets, _status.event.source].reduce((previousValue, currentValue) => {
							previousValue.add(currentValue.getPrevious());
							previousValue.add(currentValue.getNext());
							return previousValue;
						}, []).contains(target),
						selectTarget: [1, maxReach],
						ai1: get.unuseful3,
						ai2: target => {
							const evt = _status.event.getTrigger();
							return get.effect(target, evt.card, evt.player, _status.event.player);
						},
						prompt: get.prompt(event.name),
						prompt2: `你可以${player.hasCard(card => lib.filter.cardDiscardable(card, _status.event.player) && get.tag(card, name) && get.tag(card, "avn_once"), "e") ? "弃置装备区内的一张带有「延伸」「一次」标签的牌，" : ""}增加${maxReach > 1 ? `至多${get.cnNumber(maxReach)}名角色为` : "一个"}目标（你与其之间的存活角色数大于你与${get.translation(originalTarget)}之间，且上述除你以外的所有角色的座位连续）`
					}).set("source", originalTarget).set("targets", [...leftPlayers, ...rightPlayers].filter(value => lib.filter.targetEnabled2(trigger.card, trigger.player, value))).tag = name;
					"step 1"
					if (result.targets?.length) {
						event.targets = result.targets;
						if (result.cards?.length) event.cards = result.cards;
						else event.goto(3);
						if (!event.isMine() && !_status.connectMode) game.delayx();
					}
					else event.finish();
					"step 2"
					player.logSkill(event.name, targets);
					const discardingCards = cards.filter(value => lib.filter.cardDiscardable(value, player));
					if (discardingCards.length) player.discard(discardingCards);
					event.goto(4);
					"step 3"
					player.logSkill(event.name, targets);
					"step 4"
					trigger.targets.addArray(targets);
				}
			},
			_avn_once: {
				ruleSkill: true,
				locked: false,
				forced: true,
				trigger: {
					player: "useCardToTargeted"
				},
				filter: (event, player) => player.hasCard(card => get.tag(card, "avn_once"), "e") && get.info(event.card)?.range && get.distance(player, event.target) > 1,
				logTarget: "target",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					"step 0"
					if (player.hasCard(card => lib.filter.cardDiscardable(card, player) && get.tag(card, "avn_once"), "e")) player.chooseToDiscard(`${get.skillTranslation(event.name, player)}：弃置一张带有「一次」标签的牌并弃置${get.translation(trigger.target)}区域内的一张牌`, "e", card => get.tag(card, "avn_once"), true);
					if (trigger.target.countDiscardableCards(player, "hej")) player.discardPlayerCard(`${get.skillTranslation(event.name, player)}：弃置${get.translation(trigger.target)}区域内的一张牌`, trigger.target, "hej", true);
					"step 1"
					if (lib.skill._avn_once.filter(trigger, player)) {
						player.logSkill(event.name, trigger.target);
						event.goto(0);
					}
				}
			},
			_avn_throwable: {
				ruleSkill: true,
				enable: "phaseUse",
				filter: (event, player) => player.hasCard(card => lib.filter.cardDiscardable(card, player) && get.tag(card, "avn_throwable"), "e") && game.hasPlayer(current => current != player && current != player.getPrevious() && current != player.getNext()),
				position: "e",
				filterCard: card => get.tag(card, "avn_throwable"),
				filterTarget: (card, player, target) => target != player && target != player.getPrevious() && target != player.getNext(),
				check: card => {
					const player = _status.event.player;
					return Math.max(...game.filterPlayer(current => current != player && current != player.getPrevious() && current != player.getNext()).map(value => get.damageEffect(value, player, player))) - get.value(card);
				},
				content: (event, step, source, player, target) => {
					target.damage("nocard");
				},
				ai: {
					damage: true,
					order: 10,
					result: {
						target: (player, target) => get.damageEffect(target, player, target)
					}
				}
			},
			_avn_cleave: {
				ruleSkill: true,
				direct: true,
				trigger: {
					player: "useCard2"
				},
				filter: (event, player) => {
					if (!player.hasCard(card => get.tag(card, "avn_cleave"), "e")) return false;
					const type = get.type(event.card, null, false);
					if (type != "basic" && type != "trick") return false;
					return (type == "basic" || type == "trick") && game.hasPlayer(current => !event.targets.contains(current) && lib.filter.targetEnabled2(event.card, event.player, current) && (current == event.player.getPrevious() || current == event.player.getNext()));
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const name = event.name.slice(1);
					player.chooseCardTarget({
						position: "e",
						filterCard: (card, player) => lib.filter.cardDiscardable(card, player) && get.tag(card, "avn_once") && get.tag(card, _status.event.tag),
						selectCard: () => _status.event.player.hasCard(card => lib.filter.cardDiscardable(card, _status.event.player) && get.tag(card, "avn_once") && get.tag(card, _status.event.tag), "e") ? 1 : 0,
						filterTarget: (card, player, target) => {
							const evt = _status.event.getTrigger();
							return !evt.targets.contains(target) && lib.filter.targetEnabled2(evt.card, evt.player, target) && (target == evt.player.getPrevious() || target == evt.player.getNext());
						},
						ai1: get.unuseful3,
						ai2: target => {
							const evt = _status.event.getTrigger();
							return get.effect(target, evt.card, evt.player, _status.event.player);
						},
						prompt: get.prompt(event.name),
						prompt2: `你可以${player.hasCard(card => lib.filter.cardDiscardable(card, _status.event.player) && get.tag(card, "avn_once") && get.tag(card, name), "e") ? "弃置装备区内的一张带有「一次」「劈开」标签的牌，" : ""}增加一名与你的座次相邻的角色为目标`
					}).tag = name;
					"step 1"
					if (result.targets?.length) {
						event.targets = result.targets;
						if (result.cards?.length) event.cards = result.cards;
						else event.goto(3);
						if (!event.isMine() && !_status.connectMode) game.delayx();
					}
					else event.finish();
					"step 2"
					player.logSkill(event.name, targets);
					const discardingCards = cards.filter(value => lib.filter.cardDiscardable(value, player));
					if (discardingCards.length) player.discard(discardingCards);
					event.goto(4);
					"step 3"
					player.logSkill(event.name, targets);
					"step 4"
					trigger.targets.addArray(targets);
				}
			},
			_avn_not_draggable: {
				locked: false,
				mod: {
					canBeDiscarded: card => {
						if (get.tag(card, "avn_not_draggable") && get.position(card) == "e") return false;
					},
					canBeGained: card => {
						if (get.tag(card, "avn_not_draggable") && get.position(card) == "e") return false;
					}
				}
			},
			// Trick
			avn_clone_effect: {
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
			// Delay
			avn_lasso_effect: {
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
			avn_selection_box_effect: {
				cardSkill: true,
				charlotte: true,
				mark: true,
				intro: {
					content: "直到你的下回合开始，当你造成/受到伤害时，防止此伤害"
				},
				forced: true,
				trigger: {
					source: "damageBegin2",
					player: "damageBegin4"
				},
				logTarget: (event, player) => event.source == player ? event.player : null,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					trigger.cancel();
				},
				ai: {
					effect: {
						player: card => {
							if (get.tag(card, "damage")) return "zeroplayertarget";
						},
						target: card => {
							if (get.tag(card, "damage")) return "zeroplayertarget";
						}
					}
				}
			},
			avn_wings_effect: {
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
			avn_dropper_effect: {
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
				locked: false,
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
				check: (event, player) => get.attitude(player, event.player) < 0,
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
					content: "你不能使用或打出手牌直到你的体力值变化时/回合开始"
				},
				mod: {
					cardEnabled2: card => {
						if (get.position(card) == "h") return false;
					}
				}
			},
			avn_magnifying_glass_skill: {
				equipSkill: true,
				enable: "phaseUse",
				filter: (event, player) => player.hasCard(card => lib.filter.cardDiscardable(card, player) && get.name(card) == "avn_magnifying_glass", "e"),
				position: "e",
				filterCard: card => get.name(card) == "avn_magnifying_glass",
				filterTarget: true,
				check: card => Math.max(...game.filterPlayer().map(value => value.countCards("h") && -Math.min(get.attitude(_status.event.player, value), 0))) - get.value(card),
				content: (event, step, source, player, target) => {
					player.viewHandcards(target);
				},
				ai: {
					order: 10,
					result: {
						target: (player, target) => target.countCards("h") && -Math.sqrt(-Math.min(get.attitude(player, target), 0))
					}
				}
			}
		},
		translate: {
			// Rule
			_avn_reach: "延伸",
			_avn_reach_info: "当你使用基本牌或普通锦囊牌选择其他角色为唯一目标后，若你的装备区内有带有「延伸」标签的牌，你可以增加至多最大「延伸」量名角色为目标（你与其之间的存活角色数大于你与目标之间，且上述除你以外的所有角色的座位连续）。若你的装备区内有能弃置的带有「延伸」「一次」标签的牌，你先弃置装备区内的一张带有「延伸」「一次」标签的牌。",
			_avn_once: "一次",
			_avn_once_info: "当你使用有距离限制的牌指定目标后，若你的装备区内有带有「一次」标签的牌，且你与其距离大于1，你弃置装备区内的一张带有「一次」标签的牌，并弃置其区域内的一张牌。",
			_avn_throwable: "可抛",
			_avn_throwable_info: "出牌阶段，你可以弃置装备区内的一张带有「可抛」标签的牌，对一名与你的座次不相邻的其他角色造成1点伤害。",
			_avn_cleave: "劈开",
			_avn_cleave_info: "当你使用基本牌或普通锦囊牌选择目标后，若你的装备区内有带有「劈开」标签的牌，你可以增加一名与你的座次相邻的角色为目标。若你的装备区内有能弃置的带有「一次」「劈开」标签的牌，你先弃置装备区内的一张带有「一次」「劈开」标签的牌。",
			_avn_not_draggable: "不动",
			_avn_not_draggable_info: "你的装备区内的带有「不动」标签的牌不能被弃置/获得。",
			// Basic
			avn_rotate: "旋转",
			avn_rotate_info: "此牌可被重铸；出牌阶段，对一名角色使用。其横置或重置。",
			avn_move: "移动",
			avn_move_info: "当存活角色数不大于2时，此牌可被重铸；出牌阶段，对一名角色使用。其移至你指定的另一名角色的上家。",
			avn_click: "点击",
			avn_click_info: "出牌阶段，对一名角色使用。你对其造成1点伤害。",
			avn_drag: "拖拽",
			avn_drag_info: "出牌阶段，对一名场上有牌的角色使用。你将其场上的一张牌移动至你指定的另一名角色的场上。",
			// Trick
			avn_antivirus: "杀毒软件",
			avn_antivirus_info: "出牌阶段，对至多两名角色使用。你对其造成1点火焰伤害。",
			avn_plasma_cannon: "等离子炮",
			avn_plasma_cannon_info: "出牌阶段，对一名角色使用。若其场上有能被你弃置的牌，你弃置其场上的所有牌，否则你对其造成2点雷电伤害。",
			avn_clone: "克隆",
			avn_clone_effect: "克隆",
			avn_clone_info: "出牌阶段，对包含你在内的一名角色使用。其本回合下次造成伤害时，此伤害×2。",
			avn_eraser: "橡皮擦",
			avn_eraser_info: "出牌阶段，对一名场上有能被你弃置的牌的角色使用。你弃置其场上的一张牌。",
			avn_hand_tool: "抓手工具",
			avn_hand_tool_info: "出牌阶段，对包含你在内的一名角色使用。其获得一个额外回合。",
			// Delay
			avn_lasso: "套索",
			avn_lasso_effect: "套索",
			avn_lasso_info: "出牌阶段，对一名角色使用。若判定结果不为♠，直到其下回合开始，其使用牌时不能指定其他角色为目标。",
			avn_selection_box: "选框",
			avn_selection_box_effect: "选框",
			avn_selection_box_info: "出牌阶段，对一名角色使用。若判定结果不为♦，直到其下回合开始，当其造成/受到伤害时，防止此伤害。",
			avn_wings: "翅膀",
			avn_wings_effect: "翅膀",
			avn_wings_info: "出牌阶段，对一名角色使用。若判定结果不为♥，直到其下回合开始，当其受到伤害时，防止此伤害。",
			avn_dropper: "吸管",
			avn_dropper_effect: "吸管",
			avn_dropper_info: "出牌阶段，对一名角色使用。若判定结果不为♣，直到其下回合开始，当其造成伤害时，防止此伤害。",
			// Equip
			avn_brush: "画笔",
			avn_brush_info: "当存活角色数不大于3时，此牌可被重铸；<br>延伸2：当你使用基本牌或普通锦囊牌选择其他角色为唯一目标后，你可以增加至多两名角色为目标（你与其之间的存活角色数大于你与目标之间，且上述除你以外的所有角色的座位连续）。",
			avn_card: "纸牌",
			avn_card_info: "一次：当你使用有距离限制的牌指定目标后，若你与其距离大于1，你弃置装备区内的此牌并弃置其区域内的一张牌；<br>可抛：出牌阶段，你可以弃置装备区内的此牌，对一名与你的座次不相邻的其他角色造成1点伤害。",
			avn_energy_ball: "能量球",
			avn_energy_ball_info: "延伸：当你使用基本牌或普通锦囊牌选择其他角色为唯一目标后，你可以弃置装备区内的此牌，增加一个目标（你与其之间的存活角色数大于你与目标之间，且上述除你以外的所有角色的座位连续）；<br>一次：当你使用有距离限制的牌指定目标后，若你与其距离大于1，你弃置装备区内的此牌并弃置其区域内的一张牌；<br>可抛：出牌阶段，你可以弃置装备区内的此牌，对一名与你的座次不相邻的其他角色造成1点伤害；<br>劈开：当你使用基本牌或普通锦囊牌选择目标后，你可以弃置装备区内的此牌，增加一名与你的座次相邻的角色为目标。",
			avn_fire_breath: "火焰气息",
			avn_fire_breath_info: "你的区域内的牌和判定牌的属性均视为火焰；<br>不动：你的装备区内的此牌不能被弃置/获得。",
			avn_fire_breath_skill: "火焰气息",
			avn_fire_breath_skill_info: "你的区域内的牌和判定牌的属性均视为火焰。",
			avn_gun: "枪",
			avn_gun_info: "每回合限一次，当你对一名角色造成伤害后，你可以令其不能使用或打出手牌直到其体力值变化时/回合开始。",
			avn_gun_skill: "枪",
			avn_gun_skill_effect: "枪",
			avn_gun_skill_info: "每回合限一次，当你对一名角色造成伤害后，你可以令其不能使用或打出手牌直到其体力值变化时/回合开始。",
			avn_laser: "激光",
			avn_laser_info: "一次：当你使用有距离限制的牌指定目标后，若你与其距离大于1，你弃置装备区内的此牌并弃置其区域内的一张牌；<br>不动：你的装备区内的此牌不能被弃置/获得。",
			avn_magnifying_glass: "放大镜",
			avn_magnifying_glass_info: "出牌阶段，你可以弃置装备区内的此牌，观看一名角色的手牌；<br>一次：当你使用有距离限制的牌指定目标后，若你与其距离大于1，你弃置装备区内的此牌并弃置其区域内的一张牌。",
			avn_magnifying_glass_skill: "放大镜",
			avn_magnifying_glass_skill_info: "出牌阶段，你可以弃置装备区内的此牌，观看一名角色的手牌。",
			avn_pencil: "铅笔",
			avn_pencil_info: "当存活角色数不大于2时，此牌可被重铸；<br>劈开：当你使用基本牌或普通锦囊牌选择目标后，你可以增加一名与你的座次相邻的角色为目标。",
			avn_sidebar: "侧边栏",
			avn_sidebar_info: "可抛：出牌阶段，你可以弃置装备区内的此牌，对一名与你的座次不相邻的其他角色造成1点伤害。",
			// Tag
			avn_reach_tag: "延伸",
			avn_reach_2_tag: "延伸2",
			avn_once_tag: "一次",
			avn_throwable_tag: "可抛",
			avn_cleave_tag: "劈开",
			avn_not_draggable_tag: "不动"
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
			["spade", 10, "avn_antivirus", "fire"],
			["spade", 11, "avn_antivirus", "fire"],
			["spade", 12, "avn_plasma_cannon", "thunder"],
			["spade", 13, "avn_plasma_cannon", "thunder"],
			["club", 8, "avn_clone"],
			["diamond", 3, "avn_clone"],
			["diamond", 6, "avn_eraser"],
			["diamond", 7, "avn_eraser"],
			["spade", 9, "avn_hand_tool"],
			["heart", 13, "avn_hand_tool"],
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
			["diamond", 2, "avn_fire_breath", null, ["avn_not_draggable"]],
			["spade", 3, "avn_gun"],
			["diamond", 1, "avn_laser", null, ["avn_once", "avn_not_draggable"]],
			["heart", 1, "avn_magnifying_glass", null, ["avn_once"]],
			["heart", 3, "avn_pencil", null, ["avn_cleave"]],
			["heart", 2, "avn_sidebar", null, ["avn_throwable"]]
		]
	};
	for (const card in ANIMATION_VS_NONAME.card) {
		ANIMATION_VS_NONAME.card[card].image = `ext:桌面大战/image/card/${card}.webp`;
		lib.decade_extCardImage[card] = `${lib.assetURL}extension/桌面大战/image/decade_extCardImage/${card}.webp`;
		if (ANIMATION_VS_NONAME.card[card].nature) ANIMATION_VS_NONAME.card[card].nature.forEach(value => lib.decade_extCardImage[`${card}_${value}`] = `${lib.assetURL}extension/桌面大战/image/decade_extCardImage/${card}_${value}.webp`);
	}
	return ANIMATION_VS_NONAME;
});
