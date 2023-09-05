"use strict";
game.import("card", (lib, game, ui, get, ai, _status) => {
	/**
	 * @type {importCardConfig}
	 */
	const ANIMATION_VS_NONAME_INTERNET = {
		name: "animation_vs_noname_internet",
		connect: true,
		card: {
			// Basic
			avn_protect: {
				type: "basic",
				global: "avn_protect_skill",
				filterTarget: (card, player, target) => {
					if (target == player) return false;
					const event = _status.event, name = event.name;
					if (["arrangeTrigger", "avn_protect_skill"].includes(name) || name == "trigger" && event.skill == "avn_protect_skill") return true;
					const damage = event.getParent(4);
					return damage?.name == "damage" && target == damage.player;
				},
				selectTarget: -1,
				defaultYingbianEffect: "draw",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					const damage = _status.event.getParent(6);
					if (damage?.name == "damage") {
						damage.cancel();
						player.damage(damage.num, damage.source, damage.nature).set("card", damage.card).cards = damage.cards;
					}
				},
				chongzhu: () => game.countPlayer() < 3,
				ai: {
					basic: {
						order: 10,
						value: [6, 4.1, 1],
						useful: [6, 4.1, 1]
					},
					result: {
						target: (player, target) => {
							const damage = _status.event.getParent(4);
							if (damage?.name != "damage") return 0;
							const source = damage.source || player;
							return get.damageEffect(player, source, target, damage.nature) - get.damageEffect(target, source, target, damage.nature);
						},
						player: () => {
							const damage = _status.event.getParent(4);
							return damage?.name == "damage" && damage.getParent()?.name != "avn_protect" ? 0 : -Infinity;
						}
					},
					tag: {
						damage: 1,
						natureDamage: () => {
							const damage = _status.event.getParent(4);
							if (damage?.name == "damage" && damage.nature) return 1;
						},
						fireDamage: () => {
							const damage = _status.event.getParent(4);
							if (damage?.name == "damage" && damage.nature == "fire") return 1;
						},
						thunderDamage: () => {
							const damage = _status.event.getParent(4);
							if (damage?.name == "damage" && damage.nature == "thunder") return 1;
						},
						iceDamage: () => {
							const damage = _status.event.getParent(4);
							if (damage?.name == "damage" && damage.nature == "ice") return 1;
						}
					}
				}
			},
			// Trick
			avn_send: {
				type: "trick",
				enable: true,
				range: (card, player, target) => player.inRange(target),
				filterTarget: true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (_status.renku.length) player.chooseCardButton(`${get.translation(event.name)}：获得仁库中的一张牌`, true, _status.renku).ai = button => get.value(button.link);
					"step 1"
					if (result?.links?.length) {
						if (!player.storage.renku) player.storage.renku = true;
						_status.renku.removeArray(result.links);
						game.updateRenku();
						player.gain(result.links, "gain2", "fromRenku");
					}
					player.chooseCard("he", [1, Infinity], `${get.translation(event.name)}：你可以交给${get.translation(target)}任意张牌`, card => lib.filter.canBeGained(card, target, player), card => {
						const player = _status.event.player, target = _status.event.getParent().target, value = get.value(card, target), attitude = player.attitudeTo(target), effect = attitude > 0 ? 3 - value : -value;
						if (attitude > 0 && player.needsToDiscard() - ui.selected.cards.filter(value => get.position(value) == "h" && game.checkMod(value, player, false, "ignoredHandcard", player) != true).length > 0 && get.position(card) == "h" && game.checkMod(card, player, false, "ignoredHandcard", player) != true) return effect + 5;
						return effect;
					});
					"step 2"
					if (result.cards?.length) player.give(result.cards, target);
				},
				ai: {
					basic: {
						order: 1,
						useful: 3,
						value: 7
					},
					result: {
						target: (player, target) => {
							if (target.hasSkillTag("nogain")) return 0;
							const sgnAttitude = get.sgnAttitude(player, target);
							if (sgnAttitude > 0) {
								const result = Math.max(...player.getGainableCards(target, "he").map(value => get.value(value, target)));
								return result < 0 ? -Math.sqrt(-result) : Math.sqrt(result);
							}
							if (sgnAttitude < 0) {
								const result = Math.min(...player.getGainableCards(target, "he").map(value => get.value(value, target)));
								return result < 0 ? -Math.sqrt(-result) : Math.sqrt(result);
							}
							return 0;
						},
						player: player => Math.max(player.needsToDiscard() - ui.selected.cards.length, _status.renku.length) > 0 ? 0 : -Infinity
					},
					tag: {
						gain: 1
					}
				}
			},
			avn_download: {
				type: "trick",
				enable: true,
				selectTarget: -1,
				toself: true,
				filterTarget: lib.filter.isMe,
				modTarget: true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					"step 0"
					if (!target.storage.renku) target.storage.renku = true;
					const topCardsOfCardPile = get.cards(2);
					target.$throw(topCardsOfCardPile);
					game.cardsGotoSpecial(topCardsOfCardPile, "toRenku");
					game.log(target, "将", topCardsOfCardPile, "置入了仁库");
					"step 1"
					target.addTempSkill(`${event.name}_skill`);
					target.addMark(`${event.name}_skill`, 2, false);
					game.broadcastAll(ui.clear);
				},
				ai: {
					basic: {
						order: 1,
						useful: 4,
						value: 9
					},
					result: {
						target: 2
					},
					tag: {
						gain: 2
					}
				}
			},
			avn_delete: {
				type: "trick",
				enable: true,
				range: (card, player, target) => player.inRange(target),
				filterTarget: (card, player, target) => target.countCards("h"),
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (target.countCards("h")) player.choosePlayerCard(target, "h", `${get.translation(event.name)}：你可以删除${get.translation(target)}的手牌中的一张牌`, "visible");
					else event.finish();
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
							if (!target.countCards("h") || target.hasSkillTag("noh")) return 0;
							if (player.attitudeTo(target) <= 0 && !target.countCards("he")) return 1.5;
							return -1.5;
						}
					},
					tag: {
						loseCard: 1
					}
				}
			},
			avn_upload: {
				type: "trick",
				enable: true,
				selectTarget: -1,
				toself: true,
				filterTarget: lib.filter.isMe,
				modTarget: true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					target.draw(3);
					"step 1"
					if (target.countCards("he")) target.chooseCard("he", true, `${get.translation(event.name)}：将两张牌置入仁库`, 2);
					else event.finish();
					"step 2"
					if (result.cards?.length) {
						if (!target.storage.renku) target.storage.renku = true;
						target.$throw(result.cards);
						target.lose(result.cards, ui.special, "toRenku", "visible");
						game.log(target, "将", result.cards, "置入了仁库");
					}
					else event.finish();
					"step 3"
					game.broadcastAll(ui.clear);
				},
				ai: {
					basic: {
						order: 7,
						useful: 4,
						value: 9
					},
					result: {
						target: 1
					},
					tag: {
						draw: 1
					}
				}
			},
			avn_modify: {
				type: "trick",
				enable: true,
				postAi: () => true,
				range: (card, player, target) => player.inRange(target),
				filterTarget: (card, player, target) => target.countCards("h"),
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (_status.renku.length) player.chooseCardButton(`${get.translation(event.name)}：获得仁库中的一张牌`, true, _status.renku).ai = button => get.value(button.link);
					"step 1"
					if (result?.links?.length) {
						if (!player.storage.renku) player.storage.renku = true;
						_status.renku.removeArray(result.links);
						game.updateRenku();
						player.gain(result.links, "gain2", "fromRenku");
					}
					"step 2"
					const playerHandCards = event.playerHandCards = player.getCards("h"), targetHandCards = event.targetHandCards = target.getCards("h");
					if (playerHandCards.length && targetHandCards.length) player.chooseButton([`${get.translation(event.name)}：你可以用一张手牌交换${get.translation(target)}的一张手牌`, `<div class="text center">你的手牌</div>`, playerHandCards, `<div class="text center">${get.translation(target)}的手牌</div>`, targetHandCards], 2, button => {
						const evt = _status.event.getParent(), playerHandCards = evt.playerHandCards, targetHandCards = evt.targetHandCards;
						if (playerHandCards.includes(button.link)) {
							const sgnAttitude = get.sgnAttitude(_status.event.player, evt.target);
							return sgnAttitude * get.value(button.link, evt.target) - sgnAttitude * 5;
						}
						if (targetHandCards.includes(button.link)) return get.value(button.link, _status.event.player);
						return 0;
					}, button => {
						const evt = _status.event.getParent(), playerHandCards = evt.playerHandCards, targetHandCards = evt.targetHandCards;
						return playerHandCards.includes(button.link) && ui.selected.buttons.every(value => !playerHandCards.includes(value.link)) || targetHandCards.includes(button.link) && ui.selected.buttons.every(value => !targetHandCards.includes(value.link));
					});
					else event.finish();
					"step 3"
					if (result?.links?.length) player.swapHandcards(target, result.links.filter(value => event.playerHandCards.includes(value)), result.links.filter(value => event.targetHandCards.includes(value)));
					else {
						const name = event.name;
						if (!Array.isArray(player.storage[name])) player.storage[name] = [];
						player.storage[name].push(target);
						const phase = event.getParent("phase");
						if (!phase) return;
						const avnModifyResetSelectedTargets = game.createEvent("avnModifyResetSelectedTargets");
						event.next.remove(avnModifyResetSelectedTargets);
						phase.after.push(avnModifyResetSelectedTargets);
						avnModifyResetSelectedTargets.player = player;
						avnModifyResetSelectedTargets.skill = name;
						avnModifyResetSelectedTargets.setContent(() => {
							delete player.storage[skill];
						});
					}
				},
				ai: {
					basic: {
						order: 8,
						useful: [4, 1],
						value: [6, 1]
					},
					result: {
						target: (player, target) => {
							const result = player.attitudeTo(target);
							return result < 0 ? -Math.sqrt(-result) : Math.sqrt(result);
						},
						player: (player, target) => (player.storage.avn_modify?.includes(target) || Math.min(player.countCards("h"), target.countCards("h")) - ui.selected.cards.length < 1) && !_status.renku.length ? -Infinity : 0
					},
					tag: {
						loseCard: 1,
						gain: 1
					}
				}
			},
			avn_catch: {
				type: "trick",
				enable: true,
				range: (card, player, target) => player.inRange(target),
				filterTarget: (card, player, target) => player.canCompare(target),
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseToCompare(target);
					"step 1"
					if (result?.winner) {
						const nonWinner = event.nonWinner = (event.winner = result.winner) == player ? target : player;
						result.winner.line(nonWinner, "green");
						if (nonWinner.countCards("hej")) result.winner.choosePlayerCard(`${get.translation(event.name)}：将${get.translation(nonWinner)}的区域内的一张牌置入仁库`, "hej", nonWinner, true);
						else event.finish();
					}
					else event.finish();
					"step 2"
					if (result.cards?.length) {
						if (!event.winner.storage.renku) event.winner.storage.renku = true;
						event.nonWinner.$throw(result.cards);
						event.nonWinner.lose(result.cards, ui.special, "toRenku", "visible");
						game.log(event.winner, "将", event.nonWinner, "的", result.cards, "置入了仁库");
					}
					else event.finish();
					"step 3"
					game.broadcastAll(ui.clear);
				},
				ai: {
					basic: {
						order: 9,
						useful: 5,
						value: 5
					},
					result: {
						target: (player, target) => player.canCompare(target) && lib.card.guohe_copy.ai.result.target(player, target) - 1
					},
					tag: {
						loseCard: 1,
						discard: 1
					}
				}
			},
			avn_swap: {
				type: "trick",
				enable: true,
				range: (card, player, target) => player.inRange(target),
				filterTarget: (card, player, target) => lib.filter.notMe(card, player, target) && target.countCards("h"),
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (!player.countCards("h") || !target.countCards("h")) {
						event.finish();
						return;
					}
					[player, target].sortBySeat(_status.currentPhase || player).forEach(value => {
						if (!value.storage.renku) value.storage.renku = true;
					});
					const sendback = () => {
						if (_status.event != event) return () => event.resultOL = _status.event.resultOL;
					}, send = (prompt, target, chooseCardAI) => {
						game.me.chooseCard(prompt, true, "glow_result").set("target", target).ai = chooseCardAI;
						game.resume();
					}, eventNameTranslation = get.translation(event.name), targetTranslation = get.translation(target), halfOfNumberOfCloudStorageCardsRoundedDown = Math.floor(_status.renku.length / 2), playerPrompt = `${eventNameTranslation}：与${targetTranslation}同时展示一张手牌，然后与${targetTranslation}交换这两张牌${halfOfNumberOfCloudStorageCardsRoundedDown ? `，然后与${targetTranslation}各摸${get.cnNumber(halfOfNumberOfCloudStorageCardsRoundedDown)}张牌` : ""}`, chooseCardAI = event.chooseCardAI = card => {
						const player = _status.event.player, target = _status.event.target;
						return get.sgnAttitude(player, target) * get.value(card, target) - get.value(card, player);
					}, playerTranslation = get.translation(player), targetPrompt = event.targetPrompt = `${eventNameTranslation}：与${playerTranslation}同时展示一张手牌，然后与${playerTranslation}交换这两张牌${halfOfNumberOfCloudStorageCardsRoundedDown ? `，然后与${playerTranslation}各摸${get.cnNumber(halfOfNumberOfCloudStorageCardsRoundedDown)}张牌` : ""}`;
					if (player.isOnline()) {
						player.wait(sendback);
						event.ol = true;
						player.send(send, playerPrompt, target, chooseCardAI);
					}
					else {
						event.localPlayer = true;
						player.chooseCard(playerPrompt, true, "glow_result").set("target", target).ai = chooseCardAI;
					}
					if (target.isOnline()) {
						target.wait(sendback);
						event.ol = true;
						target.send(send, targetPrompt, player, chooseCardAI);
					}
					else event.localTarget = true;
					"step 1"
					if (event.localPlayer && result.cards?.length) event.card1 = result.cards[0];
					if (event.localTarget) target.chooseCard(event.targetPrompt, true, "glow_result").set("target", player).ai = event.chooseCardAI;
					"step 2"
					if (event.localTarget && result.cards?.length) event.card2 = result.cards[0];
					if (!event.resultOL && event.ol) game.pause();
					"step 3"
					try {
						if (!event.card1) event.card1 = event.resultOL[player.playerid].cards[0];
						if (!event.card2) event.card2 = event.resultOL[target.playerid].cards[0];
						if (!event.card1 || !event.card2) throw "Error: At least one of the players has not selected a hand card.";
					}
					catch (e) {
						console.log(e);
						event.finish();
						return;
					}
					game.broadcastAll((card1, card2) => {
						card1.classList.remove("glow");
						card2.classList.remove("glow");
					}, event.card1, event.card2);
					"step 4"
					player.$compare(event.card1, target, event.card2);
					game.log(player, "展示了", event.card1);
					game.log(target, "展示了", event.card2);
					game.delay(4);
					"step 5"
					const clone1 = event.card1.clone;
					if (clone1) {
						clone1.style.transition = "all 0.5s";
						clone1.style.transform = "scale(1.2)";
						clone1.delete();
						game.addVideo("deletenode", player, get.cardsInfo([clone1]));
					}
					const clone2 = event.card2.clone;
					if (clone2) {
						clone2.style.transition = "all 0.5s";
						clone2.style.transform = "scale(1.2)";
						clone2.delete();
						game.addVideo("deletenode", player, get.cardsInfo([clone2]));
					}
					game.broadcast((card1, card2) => {
						const clone1 = card1.clone;
						if (clone1) {
							clone1.style.transition = "all 0.5s";
							clone1.style.transform = "scale(1.2)";
							clone1.delete();
						}
						const clone2 = card2.clone;
						if (clone2) {
							clone2.style.transition = "all 0.5s";
							clone2.style.transform = "scale(1.2)";
							clone2.delete();
						}
					}, event.card1, event.card2);
					player.swapHandcards(target, [event.card1], [event.card2]);
					"step 6"
					const players = [player, target].sortBySeat(_status.currentPhase || player);
					let needsToUpdateRenku = false;
					players.forEach(value => {
						if (!value.storage.renku) {
							if (!needsToUpdateRenku) needsToUpdateRenku = true;
							value.storage.renku = true;
						}
					});
					if (needsToUpdateRenku) game.updateRenku();
					const numberOfCardsToDraw = Math.floor(_status.renku.length / 2);
					if (numberOfCardsToDraw) game.asyncDraw(players, numberOfCardsToDraw);
				},
				ai: {
					basic: {
						order: 1,
						useful: 4,
						value: 6
					},
					result: {
						target: (player, target) => target.countCards("h") && Math.floor(_status.renku.length / 2),
						player: player => player.countCards("h") - ui.selected.cards.length > 0 ? 0 : -Infinity
					},
					tag: {
						loseCard: 1,
						gain: 1,
						draw: () => Math.floor(_status.renku.length / 2)
					}
				}
			},
			avn_create: {
				type: "trick",
				enable: true,
				filterTarget: true,
				selectTarget: [1, Infinity],
				defaultYingbianEffect: "draw",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					target.draw();
					"step 1"
					if (target.countCards("he")) target.chooseCard("he", true, `${get.translation(event.name)}：将一张牌置入仁库`);
					else event.finish();
					"step 2"
					if (result.cards?.length) {
						if (!target.storage.renku) target.storage.renku = true;
						target.$throw(result.cards);
						target.lose(result.cards, ui.special, "toRenku", "visible");
						game.log(target, "将", result.cards, "置入了仁库");
					}
				},
				contentAfter: () => {
					game.broadcastAll(ui.clear);
				},
				ai: {
					basic: {
						order: 5,
						useful: 3,
						value: 3
					},
					result: {
						target: (player, target) => {
							const numberOfTargetCards = target.countCards("he");
							return target == player ? numberOfTargetCards - ui.selected.cards.length : numberOfTargetCards;
						}
					},
					tag: {
						draw: 1,
						loseCard: 1,
						norepeat: 1
					}
				}
			},
			avn_draw: {
				type: "trick",
				enable: true,
				range: (card, player, target) => player.inRange(target),
				filterTarget: true,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (!player.storage.renku) player.storage.renku = true;
					const topCardsOfCardPile = get.cards(5);
					player.$throw(topCardsOfCardPile);
					game.cardsGotoSpecial(topCardsOfCardPile, "toRenku");
					game.log(player, "将", topCardsOfCardPile, "置入了仁库");
					event.players = [player, target].sortBySeat(_status.currentPhase || player);
					event.chosenRenkuCards = [];
					game.delayex();
					"step 1"
					if (event.players.length) {
						event.current = event.players.shift();
						if (event.chosenRenkuCards.length) event.chosenRenkuCards.length = 0;
					}
					else event.finish();
					"step 2"
					if (event.current == target && !target.storage.renku) target.storage.renku = true;
					game.updateRenku();
					const chooseCardButton = event.current.chooseCardButton(`${get.translation(event.name)}：你可以使用仁库中的一张牌`, _status.renku);
					chooseCardButton.filterButton = button => _status.event.player.hasUseTarget(button.link);
					chooseCardButton.ai = button => {
						const link = button.link;
						return !_status.event.chosenRenkuCards.includes(link) && _status.event.player.getUseValue(link);
					};
					chooseCardButton.chosenRenkuCards = event.chosenRenkuCards;
					"step 3"
					if (result.links?.length) {
						const renkuCard = result.links[0], backup = `${event.name}_backup`;
						event.chosenRenkuCards.add(renkuCard);
						const chooseUseTarget = event.chooseUseTarget = event.current.chooseUseTarget(renkuCard, false);
						chooseUseTarget.oncard = card => {
							_status.renku.removeArray(card.cards);
							game.updateRenku();
						};
					}
					else event.goto(1);
					"step 4"
					if (event.current.hasHistory("useCard", evt => evt.getParent() == event.chooseUseTarget)) event.goto(1);
					else event.goto(2);
				},
				ai: {
					basic: {
						order: 4,
						useful: 6,
						value: 8
					},
					result: {
						target: 1
					}
				}
			},
			avn_destroy: {
				type: "trick",
				enable: true,
				filterTarget: lib.filter.notMe,
				selectTarget: -1,
				reverseOrder: true,
				defaultYingbianEffect: "remove",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (target.countCards("hej")) target.choosePlayerCard(target, "hej", `${get.translation(event.name)}：删除区域内的一张牌`, true);
					else event.finish();
					"step 1"
					if (!result.cards?.length) return;
					if (!target.storage.avn_delete) target.storage.avn_delete = true;
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
					game.log(target, "删除了", toDelete);
				},
				contentAfter: () => {
					game.broadcastAll(ui.clear);
				},
				ai: {
					wuxie: target => {
						if (!target.countCards("hej")) return 0;
					},
					basic: {
						order: 9,
						useful: 1,
						value: 5
					},
					result: {
						target: (player, target) => lib.card.guohe_copy.ai.result.target(player, target)
					},
					tag: {
						loseCard: 1,
						multitarget: 1,
						multineg: 1
					}
				}
			},
			avn_debug: {
				type: "trick",
				enable: true,
				filterTarget: lib.filter.isMe,
				modTarget: true,
				toself: true,
				selectTarget: -1,
				defaultYingbianEffect: "add",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					if (!target.storage.renku) target.storage.renku = true;
					game.updateRenku();
					const length = _status.renku.length;
					if (length) target.chooseToGuanxing(length);
					target.draw();
				},
				ai: {
					basic: {
						order: 2,
						useful: 4,
						value: 8
					},
					result: {
						target: 1.5
					},
					tag: {
						draw: 1
					}
				}
			},
			avn_clean: {
				type: "trick",
				enable: true,
				postAi: targets => targets.length == 1 && targets[0].countCards("j"),
				range: (card, player, target) => player.inRange(target),
				filterTarget: (card, player, target) => target.countDiscardableCards(player, "hej"),
				selectTarget: () => [1, Infinity],
				defaultYingbianEffect: "hit",
				content: (event, step, source, player, target, targets, card, cards, skill) => {
					if (!player.storage.renku) player.storage.renku = true;
					game.updateRenku();
					const atMost = Math.max(Math.floor(_status.renku.length / 2), 1);
					if (target.countDiscardableCards(player, "hej")) player.discardPlayerCard(target, "hej", [1, atMost], `${get.translation(event.name)}：弃置${get.translation(target)}的区域内的至多${get.cnNumber(atMost)}张牌`);
				},
				ai: {
					basic: {
						order: 9,
						useful: 6,
						value: 6,
					},
					result: {
						target: (player, target) => lib.card.guohe_copy.ai.result.target(player, target)
					},
					tag: {
						loseCard: 1,
						discard: 1
					}
				}
			},
			// Delay
			// Equip
			avn_tablet: {
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -4
				},
				defaultYingbianEffect: "draw",
				ai: {
					equipValue: (card, player) => game.countPlayer(current => player.attitudeTo(current) > 0) + 3,
					basic: {
						equipValue: 6
					}
				},
				skills: ["avn_tablet_skill"]
			},
			avn_couch: {
				type: "equip",
				subtype: "equip3",
				distance: {
					globalTo: 1
				},
				defaultYingbianEffect: "draw",
				ai: {
					equipValue: (card, player) => (get.info(card)?.ai?.basic?.equipValue || 8) - Math.min(get.recoverEffect(player, player), 0),
					basic: {
						equipValue: 7
					}
				},
				skills: ["avn_couch_skill"]
			},
			avn_plug_in: {
				type: "equip",
				subtype: "equip5",
				equipDelay: false,
				loseDelay: false,
				onEquip: (event, step, source, player, target, targets, card, cards, skill) => {
					player.logSkill("avn_plug_in_skill");
					player.draw(3);
				},
				onLose: (event, step, source, player, target, targets, card, cards, skill) => {
					const avnModuleLose = game.createEvent("avn_plug_in_lose");
					event.next.remove(avnModuleLose);
					let parent = event.getParent();
					if (parent.getlx === false) parent = parent.getParent();
					parent.after.push(avnModuleLose);
					avnModuleLose.player = player;
					avnModuleLose.setContent(() => {
						if (player.hasCard(card => lib.filter.cardDiscardable(card, player), "he")) {
							player.logSkill("avn_plug_in_skill");
							player.chooseToDiscard(`${get.skillTranslation("avn_plug_in_skill", player)}：弃置三张牌`, "he", 3, true);
						}
					});
				},
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 5
					}
				}
			},
			avn_cable: {
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
				skills: ["avn_cable_skill"]
			},
			avn_hammer: {
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -2
				},
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 5
					},
					tag: {
						avn_reach: 1
					}
				},
				skills: ["avn_hammer_skill"]
			},
			avn_program: {
				type: "equip",
				subtype: "equip4",
				distance: {
					globalFrom: -1
				},
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 8
					}
				},
				skills: ["avn_program_skill"]
			},
			avn_virablade: {
				type: "equip",
				subtype: "equip1",
				distance: {
					attackFrom: -1
				},
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 5
					},
					tag: {
						avn_cleave: 1
					}
				},
				skills: ["avn_virablade_skill"]
			},
			avn_arcade: {
				type: "equip",
				subtype: "equip5",
				defaultYingbianEffect: "draw",
				ai: {
					basic: {
						equipValue: 7
					}
				},
				skills: ["avn_arcade_skill"]
			}
		},
		skill: {
			// Basic
			avn_protect_skill: {
				cardSkill: true,
				forced: true,
				trigger: {
					player: "damageBegin4"
				},
				filter: event => game.hasPlayer(current => current.hasUsableCard("avn_protect") && lib.filter.filterTarget({
					name: "avn_protect",
					isCard: true
				}, current, event.player)),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					event.target = trigger.player;
					event.source = trigger.source;
					event.num = trigger.num;
					event.cardName = event.name.slice(0, -6);
					/**
					 * @param {Player} player
					 * @param {Player} target
					 * @param {Player} source
					 * @param {number} num
					 * @param {string} cardName
					 * @param {number} id
					 */
					event.send = (player, target, source, num, cardName, id) => {
						const chooseToUse = player.chooseToUse(`${get.translation(target)}将受到${source ? `${get.translation(source)}造成的` : ""}${num}点伤害，是否对${get.translation(target)}使用${get.translation(cardName)}，将此伤害转移给你？`, (card, player) => get.name(card) == "avn_protect" && lib.filter.cardEnabled(card, player, "forceEnable"));
						chooseToUse.type = "avn_protect";
						chooseToUse._global_waiting = true;
						chooseToUse.targetRequired = true;
						chooseToUse.id = id;
						if (game.online) {
							_status.event._resultid = id;
							game.resume();
						}
					}
					"step 1"
					const cardName = event.cardName;
					event.list = game.filterPlayer(current => current.hasUsableCard(cardName) && lib.filter.filterTarget({
						name: cardName,
						isCard: true
					}, current, target)).sortBySeat(_status.currentPhase || target);
					event.id = get.id();
					"step 2"
					if (!event.list.length) event.finish();
					else {
						const current = event.current = event.list.shift();
						if (_status.connectMode && (current.isOnline() || current == game.me)) event.goto(4);
						else event.send(current, target, source, num, event.cardName, event.id);
					}
					"step 3"
					if (result.bool) {
						event.avnProtectResult = event.current;
						event.goto(8);
					}
					else event.goto(2);
					"step 4"
					const id = event.id, sendback = (result, player) => {
						if (result && result.id == id && !event.avnProtectResult && result.bool) {
							event.avnProtectResult = player;
							game.broadcast("cancel", id);
							return () => {
								if (_status.event.id == id && _status.event.name == "chooseToUse" && _status.paused) event.resultOL = _status.event.resultOL;
								if (_status.event._parent_id == id) ui.click.cancel();
								if (_status.event.id == id) {
									if (_status.event._backup) ui.click.cancel();
									ui.click.cancel();
									if (ui.confirm) ui.confirm.close();
									if (_status.event.result) _status.event.result.id = id;
								}
							};
						}
						else if (_status.event.id == id && _status.event.name == "chooseToUse" && _status.paused) return () => event.resultOL = _status.event.resultOL;
					};
					let withoutMe = true, withoutOL = true;
					const list = event.list;
					for (let index = 0; index < list.length; index++) {
						const current = list[index];
						if (current.isOnline()) {
							if (withoutOL) withoutOL = false;
							current.wait(sendback);
							current.send(event.send, current, target, source, num, event.cardName, id);
							list.splice(index--, 1);
						}
						else if (current == game.me) {
							if (withoutMe) withoutMe = false;
							event.send(current, target, source, num, event.cardName, id);
							list.splice(index--, 1);
						}
					}
					if (withoutMe) event.goto(6);
					if (_status.connectMode && (!withoutMe || !withoutOL)) game.players.forEach(value => value.showTimer());
					event.withoutOL = withoutOL;
					"step 5"
					if (result && result.bool && !event.avnProtectResult) {
						game.broadcast("cancel", event.id);
						event.avnProtectResult = game.me;
					}
					"step 6"
					if (!event.withoutOL && !event.resultOL) game.pause();
					"step 7"
					game.players.forEach(value => value.hideTimer());
					"step 8"
					if (!event.avnProtectResult && event.list.length) event.goto(2);
					else event.finish();
					delete event.resultOL;
					delete event.avnProtectResult;
				}
			},
			// Trick
			avn_download_skill: {
				cardSkill: true,
				charlotte: true,
				onremove: true,
				intro: {
					name: "下载中……",
					mark: dialog => {
						dialog.addText("预计时间：本回合结束时");
						dialog.addAuto(_status.renku);
					}
				},
				direct: true,
				trigger: {
					global: "phaseEnd"
				},
				filter: () => _status.renku.length,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const name = event.name, countMark = player.countMark(name);
					player.removeMark(name, countMark, false);
					if (_status.renku.length) player.chooseCardButton(`${get.translation(name)}：你可以获得仁库中的至多${get.cnNumber(countMark)}张牌`, [1, countMark], _status.renku).ai = button => get.value(button.link);
					else event.finish();
					"step 1"
					const links = result.links;
					if (!links?.length) return;
					player.logSkill(event.name);
					const storage = player.storage;
					if (!storage.renku) storage.renku = true;
					_status.renku.removeArray(links);
					game.updateRenku();
					player.gain(links, "gain2", "fromRenku");
				}
			},
			// Delay
			// Equip
			avn_tablet_skill: {
				equipSkill: true,
				popname: true,
				enable: ["chooseToUse", "chooseToRespond"],
				filter: (event, player) => {
					const playerCards = player.getCards("hes", card => lib.skill.avn_tablet_skill.filterCard(card, player));
					if (playerCards.length < 2) return false;
					const firstPlayerCard = playerCards.shift(), firstPlayerCardColor = get.color(firstPlayerCard);
					return playerCards.some(value => get.color(value) != firstPlayerCardColor);
				},
				position: "hes",
				filterCard: (card, player) => {
					if (ui.selected.cards.length && get.color(card) == get.color(ui.selected.cards[0])) return false;
					if (player.hasSkill("avn_tablet_skill", null, false)) return true;
					const equips = player.getEquips("avn_tablet");
					return !equips.includes(card) || equips.some(value => !ui.selected.cards.includes(value) && value != card);
				},
				complexCard: true,
				selectCard: 2,
				viewAs: {
					name: "avn_draw"
				},
				check: card => get.name(card) != "avn_draw" && 5 - get.value(card)
			},
			avn_couch_skill: {
				equipSkill: true,
				forced: true,
				trigger: {
					player: "phaseJieshuBegin"
				},
				filter: (event, player) => player.hp < player.maxHp && player.isMinHp(true),
				content: (event, step, source, player) => {
					"step 0"
					if (player.hp < player.maxHp) {
						player.recover();
					}
					else event.finish();
					"step 1"
					game.delayx();
				}
			},
			avn_plug_in_skill: {},
			avn_cable_skill: {
				equipSkill: true,
				delay: false,
				enable: "phaseUse",
				usable: 1,
				filterTarget: true,
				selectTarget: 2,
				content: (event, step, source, player, target) => {
					target.link();
				},
				ai: {
					order: () => (lib.card.tiesuo.ai.basic.order || 7) + 0.1,
					result: {
						target: (player, target) => lib.card.tiesuo.ai.result.target(player, target)
					}
				}
			},
			avn_hammer_skill: {
				equipSkill: true,
				direct: true,
				trigger: {
					global: "phaseDiscardBegin"
				},
				filter: () => game.hasPlayer(current => current.hasHistory("gain", evt => {
					const draw = evt.getParent();
					return draw?.name != "draw" || draw.getParent()?.name != "phaseDraw";
				})),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseToRespond(get.prompt(event.name), (card, player) => {
						const name = _status.event.getParent().name;
						if (player.hasSkill(name, null, false)) return true;
						const equips = player.getEquips(name.slice(0, -6));
						return !equips.includes(card) || equips.some(value => !ui.selected.cards.includes(value) && value != card);
					}, card => game.hasPlayer(current => current.hasHistory("gain", evt => {
						const draw = evt.getParent();
						return draw?.name != "draw" || draw.getParent()?.name != "phaseDraw";
					}) && get.damageEffect(current) > 0) && 8 - get.useful(card)).set("prompt2", `你可以打出一张牌，若如此做，你可以对${get.translation(event.players = game.filterPlayer(current => current.hasHistory("gain", evt => {
						const draw = evt.getParent();
						return draw?.name != "draw" || draw.getParent()?.name != "phaseDraw";
					})))}${event.players.length > 1 ? "中的一名角色" : ""}造成1点伤害`).set("position", "hes").logSkill = event.name;
					"step 1"
					if (result.card) player.chooseTarget(`${get.skillTranslation(event.name, player)}：你可以对${get.translation(event.players)}${event.players.length > 1 ? "中的一名角色" : ""}造成1点伤害`, (card, player, target) => target.hasHistory("gain", evt => {
						const draw = evt.getParent();
						return draw?.name != "draw" || draw.getParent()?.name != "phaseDraw";
					}), target => get.damageEffect(_status.event.player, target, _status.event.player));
					else event.finish();
					"step 2"
					if (!result.targets?.length) return;
					player.line(event.target = result.targets[0], "green");
					if (event.target != player) player.addExpose(0.2);
					event.target.damage();
					game.delayex();
				},
				ai: {
					damage: true
				}
			},
			avn_program_skill: {
				equipSkill: true,
				direct: true,
				trigger: {
					global: "phaseDrawBegin2"
				},
				filter: (event, player) => {
					for (const actionHistory of player.actionHistory.slice().reverse()) {
						if (actionHistory.useSkill.some(value => value.skill == "avn_program_skill")) return false;
						if (actionHistory.isRound) break;
					}
					return event.player != player && player.hasCard(card => card != player.getEquip("avn_program"), "he");
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseCard("he", get.prompt2(event.name, event.target = trigger.player), (card, player) => {
						const parent = _status.event.getParent();
						if (get.type(card) == "equip" && !parent.target.canEquip(card, true)) return false;
						if (player.hasSkill(parent.name, null, false)) return true;
						const equips = player.getEquips(parent.name.slice(0, -6));
						return !equips.includes(card) || equips.some(value => !ui.selected.cards.includes(value) && value != card);
					}, card => {
						const target = _status.event.getParent().target;
						if (target.hasSkillTag("refuseGifts")) return 0;
						const player = _status.event.player;
						if (get.type(card) == "equip") return get.effect(target, card, target, player);
						const attitude = player.attitudeTo(target), squareRootOfAttitude = attitude < 0 ? -Math.sqrt(-attitude) : Math.sqrt(attitude);
						if (card.name == "du") return player.hp > target.hp ? -squareRootOfAttitude : 0;
						if (target.hasSkillTag("nogain")) return 0;
						return squareRootOfAttitude * Math.max(1, get.value(card, player) - get.value(card, target));
					});
					"step 1"
					if (result.cards?.length) {
						player.logSkill(event.name, target);
						const gifts = game.createEvent("_yongjian_zengyu");
						gifts.player = player;
						gifts.target = target;
						gifts.cards = result.cards;
						gifts.setContent(lib.skill._yongjian_zengyu.content);
					}
					else event.finish();
					"step 2"
					player.markAuto(`${event.name}_effect`, [target]);
					player.addTempSkill(`${event.name}_effect`);
				}
			},
			avn_program_skill_effect: {
				charlotte: true,
				intro: {
					name: "Animator Combat Tool",
					content: "当$于本回合使用基本牌或普通锦囊牌结算后，你可以将一张手牌当做此牌使用"
				},
				onremove: true,
				direct: true,
				trigger: {
					global: "useCardAfter"
				},
				filter: (event, player) => player.getStorage("avn_program_skill_effect").includes(event.player) && ["basic", "trick"].includes(get.type(event.card, null, false)) && player.countCards("hs"),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					const backup = `${event.name}_backup`, usedCard = trigger.card;
					game.broadcastAll((backup, usedCard) => lib.skill[backup] = {
						popname: true,
						position: "hs",
						filterCard: card => get.itemtype(card) == "card",
						viewAs: {
							name: usedCard.name,
							nature: usedCard.nature
						},
						check: card => 8 - get.value(card)
					}, backup, usedCard);
					const chooseToUse = player.chooseToUse(get.prompt(event.name));
					chooseToUse.norestore = true;
					chooseToUse._backupevent = backup;
					chooseToUse.backup(backup);
					chooseToUse.addCount = false;
					chooseToUse.custom = {
						add: {},
						replace: {
							window: () => void 0
						}
					};
					chooseToUse.logSkill = event.name;
					chooseToUse.prompt2 = `你可以将一张手牌当做${get.translation({
						name: usedCard.name,
						nature: usedCard.nature
					})}使用`;
				}
			},
			avn_virablade_skill: {
				equipSkill: true,
				direct: true,
				trigger: {
					source: "damageSource"
				},
				filter: (event, player) => event.player.isIn() && !player.hasHistory("useSkill", evt => evt.skill == "avn_virablade_skill" && evt.targets.includes(event.player)) && event.player.countCards("he"),
				logTarget: "player",
				check: (event, player) => player.attitudeTo(event.player) < 0,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.choosePlayerCard(event.target = trigger.player, "he", get.prompt2(event.name, event.target)).filterButton = button => {
						const parent = _status.event.getParent(), target = parent.target;
						if (target != _status.event.player) return true;
						if (target.hasSkill(parent.name, null, false)) return true;
						const equips = target.getEquips(name.slice(0, -6)), card = button.link;
						return !equips.includes(card) || equips.some(value => !ui.selected.cards.includes(value) && value != card);
					};
					"step 1"
					if (!result.cards?.length) return;
					player.logSkill(event.name, target);
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
				}
			},
			avn_arcade_skill: {
				derivation: "chongxu_faq",
				equipSkill: true,
				enable: "phaseUse",
				usable: 1,
				filter: (event, player) => player.hasCard(card => lib.skill.avn_arcade_skill.filterCard(card, player), lib.skill.avn_arcade_skill.position),
				position: "he",
				filterCard: (card, player) => {
					if (player.hasSkill("avn_arcade_skill", null, false)) return true;
					const equips = player.getEquips("avn_arcade");
					return !equips.includes(card) || equips.some(value => !ui.selected.cards.includes(value) && value != card);
				},
				check: card => 7 - get.useful(card),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					event.beatmap = lib.skill.chongxu.beatmaps.randomGet();
					event.players = game.filterPlayer(current => current != player).sortBySeat(_status.currentPhase || player);
					event.num = 0;
					"step 1"
					event.players[num].chooseToDiscard(`${get.skillTranslation(event.name, player)}：你可以弃置一张牌，若如此做，则随机选择一首音乐且你与${get.translation(player)}依次演奏之，完成度比另一名角色高的角色摸两张牌`, "he").set("ai", card => _status.event.player.attitudeTo(_status.event.getParent().player) < 0 && 5 - get.useful(card));
					"step 2"
					if (result.cards?.length) {
						const current = event.players[num];
						player.line(current, "green");
						current.addExpose(0.2);
						event.players = [player, current].sortBySeat(_status.currentPhase || player);
						event.num = 0;
						event.scoreMap = new Map();
					}
					else if (++event.num < event.players.length) event.goto(1);
					else event.goto(6);
					"step 3"
					event.players[num].chooseToPlayBeatmap(event.beatmap);
					"step 4"
					const current = event.players[num];
					current.popup(result.rank[0], result.rank[1]);
					game.log(current, "的演奏评级为", `#y${result.rank[0]}`, "，完成率为", `#y${result.accuracy}%`);
					event.scoreMap.set(current, result.accuracy);
					if (++event.num < event.players.length) event.goto(3);
					"step 5"
					const max = Math.max(...event.scoreMap.values()), winners = Array.from(event.scoreMap.keys()).reduce((previousValue, currentValue) => {
						if (event.scoreMap.get(currentValue) == max) previousValue.push(currentValue);
						return previousValue;
					}, []);
					if (winners.length == 1) winners[0].draw(2);
					event.finish();
					"step 6"
					player.chooseToPlayBeatmap(event.beatmap);
					"step 7"
					player.popup(result.rank[0], result.rank[1]);
					game.log(player, "的演奏评级为", `#y${result.rank[0]}`, "，完成率为", `#y${result.accuracy}%`);
					player.draw(Math.floor(Math.min(result.accuracy / 33, 3)));
				},
				ai: {
					order: 10,
					result: {
						player: 1
					}
				}
			}
		},
		translate: {
			// Basic
			avn_protect: "保护",
			avn_protect_info: "当存活角色数小于3时，此牌可被重铸。<br>当一名其他角色受到伤害时，对其使用。你将此伤害转移给你。",
			// Trick
			avn_send: "发送",
			avn_send_info: "出牌阶段，对你攻击范围内的一名角色使用。你获得仁库中的一张牌，然后你可以交给其任意张牌。",
			avn_download: "下载",
			get avn_download_skill() {
				return this.avn_download;
			},
			avn_download_info: "出牌阶段，对包含你在内的一名角色使用。其将牌堆顶的两张牌置入仁库，然后本回合结束时，其可以获得仁库中的至多两张牌。",
			avn_delete: "删除",
			avn_delete_info: "出牌阶段，对你攻击范围内的有手牌的一名角色使用。你观看其所有手牌，然后你可以删除其中的一张牌。",
			avn_upload: "上传",
			avn_upload_info: "出牌阶段，对包含你在内的一名角色使用。其摸三张牌，然后将两张牌置入仁库。",
			avn_modify: "修改",
			avn_modify_info: "出牌阶段，对你攻击范围内的有手牌的一名角色使用。你获得仁库中的一张牌，然后观看其所有手牌，然后你可以用一张手牌交换其一张手牌。",
			avn_catch: "捕获",
			avn_catch_info: "出牌阶段，对你攻击范围内的能成为你拼点的目标的一名角色使用。你和其拼点，然后赢的角色将没赢的角色的区域内的一张牌置入仁库。",
			avn_swap: "交换",
			avn_swap_info: "出牌阶段，对你攻击范围内的一名有手牌的其他角色使用。你与其同时展示一张手牌，然后你与其交换这两张牌，然后你与其各摸仁库中的牌数的一半（向下取整）张牌。",
			avn_create: "创建",
			avn_create_info: "出牌阶段，对任意名角色使用。其摸一张牌，然后将一张牌置入仁库。",
			avn_draw: "绘制",
			avn_draw_info: "出牌阶段，对你攻击范围内的一名角色使用。你将牌堆顶的五张牌置入仁库，然后你与其依次可以使用仁库中的一张牌。",
			avn_destroy: "破坏",
			avn_destroy_info: "出牌阶段，对所有其他角色使用。其删除其区域内的一张牌。",
			avn_debug: "调试",
			avn_debug_info: "出牌阶段，对包含你在内的一名角色使用。其卜算X（X为仁库中的牌数），然后摸一张牌。",
			avn_clean: "清理",
			avn_clean_info: "出牌阶段，对你攻击范围内的区域内有牌的任意名角色使用。你弃置其区域里的至多仁库中的牌数的一半（向下取整，且至少一张）张牌。",
			// Delay
			// Equip
			avn_tablet: "平板",
			get avn_tablet_info() {
				return this.avn_tablet_skill_info;
			},
			get avn_tablet_skill() {
				return this.avn_tablet;
			},
			avn_tablet_skill_info: "你可以将两张颜色不同的牌当做【绘制】使用或打出。",
			avn_couch: "长椅",
			get avn_couch_info() {
				return `其他角色至你的距离+1。<br>${this.avn_couch_skill_info}`;
			},
			get avn_couch_skill() {
				return this.avn_couch;
			},
			avn_couch_skill_info: "锁定技，结束阶段，若你的体力值为全场唯一最少，则你回复1点体力。",
			avn_plug_in: "插件",
			get avn_plug_in_info() {
				return this.avn_plug_in_skill_info;
			},
			get avn_plug_in_skill() {
				return this.avn_plug_in;
			},
			avn_plug_in_skill_info: "锁定技，当此牌进入你的装备区时，你摸三张牌。当此牌离开你的装备区后，你弃置三张牌。",
			avn_cable: "线缆",
			get avn_cable_info() {
				return this.avn_cable_skill_info;
			},
			get avn_cable_skill() {
				return this.avn_cable;
			},
			avn_cable_skill_info: "出牌阶段限一次，你可以令两名角色依次横置或重置。",
			avn_hammer: "锤子",
			get avn_hammer_info() {
				return `${this.avn_hammer_skill_info}<br>${lib.translate.avn_reach}：${lib.translate.avn_reach_info}`;
			},
			get avn_hammer_skill() {
				return this.avn_hammer;
			},
			avn_hammer_skill_info: "每名角色的弃牌阶段开始时，你可以打出一张牌，若如此做，你可以对一名本回合不因摸牌阶段的额定摸牌而获得牌的角色造成1点伤害。",
			avn_program: "程序",
			get avn_program_info() {
				return `你至其他角色的距离-1。<br>${this.avn_program_skill_info}`;
			},
			get avn_program_skill() {
				return this.avn_program;
			},
			get avn_program_skill_effect() {
				return this.avn_program;
			},
			avn_program_skill_info: "每轮限一次，一名其他角色的摸牌阶段开始时，你可以〖赠予〗其一张牌。若如此做，当其于本回合使用基本牌或普通锦囊牌结算后，你可以将一张手牌当做此基本牌或普通锦囊牌使用。",
			avn_virablade: "病刃",
			get avn_virablade_info() {
				return `${this.avn_virablade_skill_info}<br>${lib.translate.avn_cleave}：${lib.translate.avn_cleave_info}`;
			},
			get avn_virablade_skill() {
				return this.avn_virablade;
			},
			avn_virablade_skill_info: "每回合每名角色限一次，当你对其造成伤害后，你可以删除其一张牌。",
			avn_arcade: "街机",
			get avn_arcade_info() {
				return this.avn_arcade_skill_info;
			},
			get avn_arcade_append() {
				return `<span class="text" style="font-family: yuanli;">${lib.translate.chongxu_faq}：${lib.translate.chongxu_faq_info}</span>`;
			},
			get avn_arcade_skill() {
				return this.avn_arcade;
			},
			avn_arcade_skill_info: "出牌阶段限一次，你可以弃置一张牌，若如此做，其他角色依次可以弃置一张牌直到有角色如此做，若此角色存在，则随机选择一首音乐且你与其依次演奏之，完成度比对方高的角色摸两张牌，否则你随机演奏一首音乐，并根据完成度来摸牌（至多三张）。",
			get avn_arcade_skill_append() {
				return `<span style="font-family: yuanli;">${lib.translate.chongxu_faq}：${lib.translate.chongxu_faq_info}</span>`;
			}
			// Tag
		},
		list: [
			// Basic
			["spade", 3, "avn_protect", null, ["yingbian_kongchao", "yingbian_draw"]],
			["spade", 4, "avn_protect", null, ["yingbian_canqu", "yingbian_draw"]],
			["spade", 5, "avn_protect", null, ["yingbian_zhuzhan", "yingbian_draw"]],
			["spade", 6, "avn_protect", null, ["yingbian_canqu", "yingbian_draw"]],
			["spade", 7, "avn_protect", null, ["yingbian_fujia", "yingbian_draw"]],
			["club", 3, "avn_protect", null, ["yingbian_kongchao", "yingbian_draw"]],
			["club", 4, "avn_protect", null, ["yingbian_canqu", "yingbian_draw"]],
			["club", 5, "avn_protect", null, ["yingbian_zhuzhan", "yingbian_draw"]],
			["club", 6, "avn_protect", null, ["yingbian_canqu", "yingbian_draw"]],
			["club", 7, "avn_protect", null, ["yingbian_fujia", "yingbian_draw"]],
			["heart", 3, "avn_protect", null, ["yingbian_kongchao", "yingbian_draw"]],
			["heart", 4, "avn_protect", null, ["yingbian_canqu", "yingbian_draw"]],
			["heart", 5, "avn_protect", null, ["yingbian_zhuzhan", "yingbian_draw"]],
			["heart", 6, "avn_protect", null, ["yingbian_canqu", "yingbian_draw"]],
			["heart", 7, "avn_protect", null, ["yingbian_fujia", "yingbian_draw"]],
			["diamond", 3, "avn_protect", null, ["yingbian_kongchao", "yingbian_draw"]],
			["diamond", 4, "avn_protect", null, ["yingbian_canqu", "yingbian_draw"]],
			["diamond", 5, "avn_protect", null, ["yingbian_zhuzhan", "yingbian_draw"]],
			["diamond", 6, "avn_protect", null, ["yingbian_canqu", "yingbian_draw"]],
			["diamond", 7, "avn_protect", null, ["yingbian_fujia", "yingbian_draw"]],
			// Trick
			["diamond", 8, "avn_send", null, ["yingbian_kongchao", "yingbian_add"]],
			["diamond", 9, "avn_send", null, ["gifts"]],
			["heart", 12, "avn_download", null, ["yingbian_kongchao", "yingbian_add"]],
			["heart", 13, "avn_download", null, ["gifts"]],
			["spade", 10, "avn_delete", null, ["yingbian_canqu", "yingbian_add"]],
			["spade", 11, "avn_delete", null, ["gifts"]],
			["heart", 10, "avn_upload", null, ["yingbian_zhuzhan", "yingbian_add"]],
			["heart", 11, "avn_upload", null, ["gifts"]],
			["club", 10, "avn_modify", null, ["yingbian_fujia", "yingbian_add"]],
			["club", 11, "avn_modify", null, ["gifts"]],
			["spade", 12, "avn_catch", null, ["yingbian_canqu", "yingbian_add"]],
			["spade", 13, "avn_catch", null, ["gifts"]],
			["club", 8, "avn_swap", null, ["yingbian_zhuzhan", "yingbian_add"]],
			["club", 9, "avn_swap", null, ["gifts"]],
			["diamond", 12, "avn_create", null, ["yingbian_zhuzhan", "yingbian_hit"]],
			["diamond", 13, "avn_create", null, ["gifts"]],
			["diamond", 10, "avn_draw", null, ["yingbian_zhuzhan", "yingbian_add"]],
			["diamond", 11, "avn_draw", null, ["gifts"]],
			["spade", 8, "avn_destroy", null, ["yingbian_fujia", "yingbian_hit"]],
			["spade", 9, "avn_destroy", null, ["yingbian_fujia", "yingbian_remove"]],
			["heart", 8, "avn_debug", null, ["yingbian_zhuzhan", "yingbian_add"]],
			["heart", 9, "avn_debug", null, ["gifts"]],
			["club", 12, "avn_clean", null, ["yingbian_zhuzhan", "yingbian_hit"]],
			["club", 13, "avn_clean", null, ["gifts"]],
			// Delay
			// Equip
			["diamond", 1, "avn_tablet", null, ["gifts"]],
			["heart", 2, "avn_couch", null, ["gifts"]],
			["heart", 1, "avn_plug_in", null, ["gifts"]],
			["club", 2, "avn_cable", null, ["gifts"]],
			["club", 1, "avn_hammer", null, ["yingbian_kongchao", "yingbian_draw"]],
			["spade", 2, "avn_program", null, ["gifts"]],
			["spade", 1, "avn_virablade", null, ["yingbian_fujia", "yingbian_draw"]],
			["diamond", 2, "avn_arcade", null, ["gifts"]]
		]
	};
	if (typeof lib.decade_extCardImage != "object") lib.decade_extCardImage = {};
	for (const card in ANIMATION_VS_NONAME_INTERNET.card) {
		ANIMATION_VS_NONAME_INTERNET.card[card].audio = "ext:桌面大战/audio/card";
		ANIMATION_VS_NONAME_INTERNET.card[card].fullborder = "simple";
		ANIMATION_VS_NONAME_INTERNET.card[card].image = `ext:桌面大战/image/card/${card}.webp`;
		lib.decade_extCardImage[card] = `${lib.assetURL}extension/桌面大战/image/decade_extCardImage/${card}.webp`;
		if (ANIMATION_VS_NONAME_INTERNET.card[card].nature) ANIMATION_VS_NONAME_INTERNET.card[card].nature.forEach(value => lib.decade_extCardImage[`${card}_${value}`] = `${lib.assetURL}extension/桌面大战/image/decade_extCardImage/${card}_${value}.webp`);
	}
	for (const skill in ANIMATION_VS_NONAME_INTERNET.skill) {
		ANIMATION_VS_NONAME_INTERNET.skill[skill].audio = false;
	}
	return ANIMATION_VS_NONAME_INTERNET;
});
