"use strict";
game.import("extension", (lib, game, ui, get, ai, _status) => ({
	name: "桌面大战",
	content: (config, pack) => {
		if (typeof game.shijianCreateProgress != "function") {
			game.shijianCreateProgress = (title, max, fileName, value) => {
				const parent = ui.create.div(ui.window, {
					textAlign: "center",
					width: "300px",
					height: "150px",
					left: "calc(50% - 150px)",
					top: "auto",
					bottom: "calc(50% - 75px)",
					zIndex: "10",
					boxShadow: "rgb(0 0 0 / 40 %) 0 0 0 1px, rgb(0 0 0 / 20 %) 0 3px 10px",
					backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
					borderRadius: "8px"
				});

				parent.className = "dialog";

				const container = ui.create.div(parent, {
					position: "absolute",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%"
				});

				container.ontouchstart = ui.click.dialogtouchStart;
				container.ontouchmove = ui.click.touchScroll;
				container.style.WebkitOverflowScrolling = "touch";
				parent.ontouchstart = ui.click.dragtouchdialog;

				const caption = ui.create.div(container, "", title, {
					position: "relative",
					paddingTop: "8px",
					fontSize: "20px"
				});

				ui.create.node("br", container);

				const tip = ui.create.div(container, {
					position: "relative",
					paddingTop: "8px",
					fontSize: "20px",
					width: "100%"
				});

				const file = ui.create.node("span", tip, "", fileName);
				file.style.width = file.style.maxWidth = "100%";
				ui.create.node("br", tip);
				const index = ui.create.node("span", tip, "", String(value || "0"));
				ui.create.node("span", tip, "", "/");
				const maxSpan = ui.create.node("span", tip, "", String(max || "未知"));

				ui.create.node("br", container);

				const progress = ui.create.node("progress.zxgxProgress", container);
				progress.setAttribute("value", value || "0");
				progress.setAttribute("max", max);

				parent.getTitle = () => caption.innerText;
				parent.setTitle = (title) => caption.innerText = title;
				parent.getFileName = () => file.innerText;
				parent.setFileName = (name) => file.innerText = name;
				parent.getProgressValue = () => progress.value;
				parent.setProgressValue = (value) => progress.value = index.innerText = value;
				parent.getProgressMax = () => progress.max;
				parent.setProgressMax = (max) => progress.max = maxSpan.innerText = max;
				return parent;
			};
		}
		lib.arenaReady.push(() => {
			if (lib.extensionPack.桌面大战) {
				const address = `https://ghproxy.com/https://raw.githubusercontent.com/Show-K/animation-vs-noname/master/`;
				fetch(`${address}update.js?date=${(new Date()).getTime()}`)
					.then(response => {
						if (!response.ok) throw response;
						return response.text();
					})
					.then(text => {
						const data = eval(text);
						console.log(data);
						const localVersion = lib.extensionPack.桌面大战.version || "0";
						if (data.version == localVersion) return;
						else {
							/**
							 * @param { string } v1
							 * @param { string } v2
							 * @returns { boolean | "equal" }
							 */
							function compareVersion(v1 = "", v2 = "") {
								if (v1 === v2) return "equal";
								let version_1 = v1.split(".").map(item => Number(item) || 0);
								let version_2 = v2.split(".").map(item => Number(item) || 0);
								if (version_1.length == 1 && version_1[0] == 0) {
									if (version_2.length > 1 || version_2[0] > 0) return true;
								} else if (version_2.length == 1 && version_2[0] == 0) {
									return true;
								} else {
									for (let i = 0; i <= version_1.length && i <= version_2.length; i++) {
										version_1[i] = version_1[i] || 0;
										version_2[i] = version_2[i] || 0;
										if (version_2[i] > version_1[i]) return true;
										if (version_1[i] > version_2[i]) return false;
									}
								}
							};

							if (!compareVersion(localVersion, data.version)) return;
						}

						function myConfirm(message, callback) {
							if (navigator.notification && navigator.notification.confirm) {
								navigator.notification.confirm(message, index => {
									index == 1 && callback();
								}, ["确定", "取消"]);
							} else {
								window.confirm(message) && callback();
							}
						}

						myConfirm(`《桌面大战》扩展检测到更新（${data.version}），是否更新？\n${data.changeLog}`, () => {
							/**
							 * @param { string } url 
							 */
							function download(url, success, error) {
								const path = `extension/桌面大战`;
								if (window.FileTransfer) {
									function downloadFile() {
										let fileTransfer = new FileTransfer();
										fileTransfer.download(encodeURI(`${address}${url}?date=${(new Date()).getTime()}`), encodeURI(`${lib.assetURL}${path}/${url}`), success, error);
									}
									window.resolveLocalFileSystemURL(lib.assetURL,
										/**
										 * @param { DirectoryEntry } DirectoryEntry 
										 */
										DirectoryEntry => {
											DirectoryEntry.getDirectory(path, { create: false }, dir => {
												dir.getDirectory(url, { create: false }, () => {
													console.error(`${path}/${url}是文件夹`);
													success(true);
												}, downloadFile);
											}, downloadFile);
										}, downloadFile);
								} else {
									fetch(`${address}${url}?date=${(new Date()).getTime()}`)
										.then(response => response.arrayBuffer())
										.then(arrayBuffer => {
											game.ensureDirectory(path, () => {
												const fs = require("fs");
												const p = require("path");
												const filePath = p.join(__dirname, path, url);
												if (fs.existsSync(filePath)) {
													const stat = fs.statSync(filePath);
													if (stat.isDirectory()) {
														console.error(`${path}/${url}是个文件夹`);
														return success(true);
													}
												}
												fs.writeFile(filePath, Buffer.from(arrayBuffer), null, e => {
													if (e) error(e);
													else success();
												});
											});
										})
										.catch(response => error(new Error(response.statusText)));
								}
							}

							/**
							 * @param { string[] } files 
							 */
							function downloadList(files) {
								if (!Array.isArray(files) || files.length == 0) return;
								let i = 0;
								const progress = game.shijianCreateProgress(`更新《桌面大战》扩展`, files.length, files[0], i);
								const success = skip => {
									if (!files[++i]) {
										progress.setProgressValue(files.length);
										progress.setFileName("下载完成");
										setTimeout(() => {
											progress.remove();
											setTimeout(() => {
												alert(`《桌面大战》扩展更新完成，将自动重启`);
												game.reload();
											}, 100);
										}, 200);
										return;
									}
									progress.setProgressValue(i);
									progress.setFileName(files[i]);
									download(files[i], success, error);
								};
								const error = e => {
									console.log("下载失败", e);
									progress.setFileName(`重新下载: ${files[i]}`);
									download(files[i], success, error);
								};

								download(files[i], success, error);
							}

							/** @type { string[] } */
							const files = localVersion == data.oldversion ? data.updateFiles : data.allFiles;
							downloadList(files);
						});
					})
					.catch(e => {
						if (e.message == "Failed to fetch") alert("网络连接失败");
						else if (e instanceof Response) console.error(`桌面大战: ${e.statusText}`);
						else console.error("其他错误", e);
					});
			} else {
				console.error("lib.extensionPack.桌面大战不存在，无法在线更新");
			}
		});
		const characters = Object.keys(lib.characterPack.animation_vs_noname);
		if (!Array.isArray(lib.rank.rarity.rare)) lib.rank.rarity.rare = [];
		lib.rank.rarity.rare.addArray(characters);
		if (!Array.isArray(lib.rank.bp)) lib.rank.bp = [];
		lib.rank.bp.addArray(characters);
		const confirmedUnlockedCharacters = config.confirmed_unlocked_characters || [], newUnlockedCharacters = (config.unlocked_characters || []).filter(value => !confirmedUnlockedCharacters.includes(value));
		if (newUnlockedCharacters.length) {
			game.saveExtensionConfig("桌面大战", "confirmed_unlocked_characters", game.getExtensionConfig("桌面大战", "confirmed_unlocked_characters").addArray(newUnlockedCharacters));
			lib.arenaReady.push(() => {
				const hiddenCharacters = [
					"avn_the_second_coming_the_chosen_one_return",
					"avn_dark_blue",
					"avn_pink",
					"avn_gold"
				], dialog = ui.create.dialog((() => {
					const ruby = document.createElement("ruby");
					ruby.style.fontSize = "2em";
					ruby.style.fontWeight = "bold";
					const newUnlockedHiddenCharacters = newUnlockedCharacters.some(value => hiddenCharacters.includes(value));
					if (newUnlockedHiddenCharacters) {
						const redSpan = document.createElement("span");
						ruby.append(redSpan);
						redSpan.style.color = "#CC0000";
						redSpan.textContent = "武";
						const greenSpan = document.createElement("span");
						ruby.append(greenSpan);
						greenSpan.style.color = "#66CC00";
						greenSpan.textContent = "将";
						const blueSpan = document.createElement("span");
						ruby.append(blueSpan);
						blueSpan.style.color = "#33CCFF";
						blueSpan.textContent = "解";
						const yellowSpan = document.createElement("span");
						ruby.append(yellowSpan);
						yellowSpan.style.color = "#FFCC00";
						yellowSpan.textContent = "锁";
					}
					else ruby.textContent = "武将解锁";
					const leftParenthesisRP = document.createElement("rp");
					ruby.append(leftParenthesisRP);
					leftParenthesisRP.textContent = "（";
					const rt = document.createElement("rt");
					ruby.append(rt);
					if (newUnlockedHiddenCharacters) {
						const span = document.createElement("span");
						rt.append(span);
						span.style.color = "#FF6600";
						span.textContent = "Character Unlocked";
					}
					else rt.textContent = "Character Unlocked";
					const rightParenthesisRP = document.createElement("rp");
					ruby.append(rightParenthesisRP);
					rightParenthesisRP.textContent = "）";
					return ruby.outerHTML;
				})(), "hidden");
				if (newUnlockedCharacters.length == 1) {
					const newUnlockedCharacter = newUnlockedCharacters[0];
					dialog.add((() => {
						const span = document.createElement("span");
						span.style.fontSize = "1.5em";
						span.style.fontWeight = "bold";
						span.textContent = get.translation(newUnlockedCharacter);
						return span.outerHTML;
					})());
					dialog.addText((() => {
						const span = document.createElement("span");
						span.style.fontSize = "1.17em";
						span.style.fontWeight = "bold";
						span.textContent = lib.characterTitle[newUnlockedCharacter];
						return span.outerHTML;
					})());
				}
				if (newUnlockedCharacters.length > 3) dialog.addSmall([newUnlockedCharacters, "character"], true);
				else dialog.add([newUnlockedCharacters, "character"], true);
				dialog.classList.add("forcebutton", "withbg");
				dialog.addText(`查看：选项→武将→桌面大战`);
				if (typeof window.resetGameTimeout != "undefined") {
					clearTimeout(window.resetGameTimeout);
					delete window.resetGameTimeout;
				}
				dialog.open();
				let hidden = false;
				if (!ui.auto.classList.contains("hidden")) {
					ui.auto.hide();
					hidden = true;
				}
				game.pause();
				const control = ui.create.control("确定", () => {
					dialog.close();
					control.close();
					if (hidden) ui.auto.show();
					game.resume();
				});
			});
		}
		if (pack.changeLog) game.showExtensionChangeLog(pack.changeLog);
	},
	precontent: data => {
		if (!data.enable) return;
		if (parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]) <= 51) {
			alert(`《无名杀》由理版（Windows）或由理兼容版不支持运行《桌面大战》。`);
			return;
		}
		if (!Array.isArray(data.unlocked_characters)) game.saveExtensionConfig("桌面大战", "unlocked_characters", []);
		if (!Array.isArray(data.confirmed_unlocked_characters)) game.saveExtensionConfig("桌面大战", "confirmed_unlocked_characters", []);
		game.unlockAllAnimationVsNonameCharacters = () => game.saveExtensionConfig("桌面大战", "unlocked_characters", game.getExtensionConfig("桌面大战", "unlocked_characters").addArray(Object.keys(lib.characterPack.animation_vs_noname).filter(value => lib.characterPack.animation_vs_noname[value][4].includes("unseen"))));
		game.lockTheSecondComingTheChosenOneReturn = () => {
			game.saveExtensionConfig("桌面大战", "unlocked_characters", game.getExtensionConfig("桌面大战", "unlocked_characters").removeArray(["avn_the_second_coming_the_chosen_one_return"]));
			game.saveExtensionConfig("桌面大战", "confirmed_unlocked_characters", game.getExtensionConfig("桌面大战", "confirmed_unlocked_characters").removeArray(["avn_the_second_coming_the_chosen_one_return"]));
		};
		const animationVsNonameDirectory = `${lib.assetURL}extension/桌面大战`;
		lib.init.css(animationVsNonameDirectory, "extension");
		if (!data.imported) {
			game.saveExtensionConfig("桌面大战", "imported", true);
			lib.config.characters.add("animation_vs_noname");
			game.saveConfigValue("characters");
			lib.config.cards.add("animation_vs_noname");
			lib.config.cards.add("animation_vs_noname_internet");
			game.saveConfigValue("cards");
		}
		lib.avnCharacterTitle = {
			avn_alan_becker: "动画师",
			avn_victim: "起源",
			avn_the_chosen_one: "叛逆",
			avn_the_dark_lord: "宿敌",
			avn_the_second_coming: "出神入化",
			avn_the_second_coming_the_chosen_one_return: "归来",
			avn_red: "蓄势待发",
			avn_green: "鬼斧神工",
			avn_blue: "返璞归真",
			avn_yellow: "足智多谋",
			avn_virabot: "恶意",
			avn_agent: "控制",
			avn_herobrine: "传说",
			avn_purple: "追求",
			avn_dark_blue: "遥远",
			avn_pink: "落花",
			avn_king_orange: "执念",
			avn_gold: "稚子",
			avn_alexcrafter28: "世界奇闻者",
			ska_warden: "循声守卫",
			sst_mario: "炎烈意决",
			sst_kirby: "灯火之星",
			avn_corn_dog_guy: "适逢其时"
		};
		lib.config.all.characters.add("animation_vs_noname");
		lib.translate.animation_vs_noname_character_config = "桌面大战";
		lib.init.jsForExtension(`${animationVsNonameDirectory}/character`, "animation_vs_noname");
		lib.config.all.cards.add("animation_vs_noname");
		lib.config.all.cards.add("animation_vs_noname_internet");
		lib.translate.animation_vs_noname_card_config = "桌面大战";
		lib.translate.animation_vs_noname_internet_card_config = "桌战IN";
		const cardDirectory = `${animationVsNonameDirectory}/card`;
		lib.init.jsForExtension(cardDirectory, "animation_vs_noname");
		lib.init.jsForExtension(cardDirectory, "animation_vs_noname_internet");
	},
	onremove: () => game.saveExtensionConfig("桌面大战", "imported"),
	help: {
		桌面大战: (description => {
			/**
			 * @param {string} textContent
			 */
			const createDiv = textContent => {
				const div = document.createElement("div");
				div.style.margin = "10px";
				div.textContent = textContent;
				return div;
			};
			/**
			 * @param {string[]} textContent
			 */
			const createUL = (...textContent) => {
				const ul = document.createElement("ul");
				ul.style.marginTop = "0";
				/**
				 * @type {HTMLLIElement}
				 */
				let li;
				textContent.forEach((value, index) => {
					if (index % 2) {
						const descriptionUL = document.createElement("ul");
						li.append(descriptionUL);
						descriptionUL.style.paddingLeft = "20px";
						descriptionUL.style.paddingTop = "5px";
						const descriptionLI = document.createElement("li");
						descriptionUL.append(descriptionLI);
						descriptionLI.textContent = value;
					}
					else {
						li = document.createElement("li");
						ul.append(li);
						li.textContent = value;
					}
				});
				return ul;
			};
			return description.reduce((previousValue, currentValue) => `${previousValue}${Array.isArray(currentValue) ? createUL(...currentValue).outerHTML : createDiv(currentValue).outerHTML}`, "");
		})([
			"新事件机制",
			[
				"删除",
				"将指定牌移出游戏。"
			],
			"新装备机制",
			[
				"延伸",
				"当你使用基本牌或普通锦囊牌选择目标后，若你的装备区内有带有「延伸」标签的牌，你可以增加至多最大「延伸」值名与任意目标的座次相邻的角色为目标。",
				"一次",
				"每回合限一次，当你使用有距离限制的牌指定目标后，若你的装备区内有带有「一次」标签的牌，且你与其距离大于1，你可以弃置其区域内的一张牌。",
				"可抛",
				"出牌阶段，你可以弃置装备区内的一张带有「可抛」标签的牌，对一名与你的座次不相邻的其他角色造成1点伤害。",
				"劈开",
				"当你使用基本牌或普通锦囊牌选择目标后，若你的装备区内有带有「劈开」标签的牌，你可以增加一名与你的座次相邻的角色为目标。",
				"不动",
				"你的装备区内的带有「不动」标签的牌不能被弃置或获得。"
			]
		])
	},
	config: {
		avn_change_log: {
			name: `<details><summary>更新日志（2）</summary><ol>${[
				"新武将：Herobrine（待解锁）；",
				"新武将：<ruby>紫<rp>（</rp><rt>Purple</rt><rp>）</rp></ruby>（待解锁）；",
				"新武将：<ruby>橙国王<rp>（</rp><rt>King Orange</rt><rp>）</rp></ruby>（待解锁）；",
				"新武将：Alexcrafter28；",
				"新武将：<ruby>监守者<rp>（</rp><rt>Warden</rt><rp>）</rp></ruby>；",
				"新卡牌包：<ruby>桌面大战<rp>（</rp><rt>Animation vs. Noname</rt><rp>）</rp></ruby>；",
				"调整了<ruby>艾伦·贝克尔<rp>（</rp><rt>Alan Becker</rt><rp>）</rp></ruby>〖赋名〗；",
				"修复了一些小问题。"
			].reduce((previousValue, currentValue) => `${previousValue}<li>${currentValue}</li>`, "")}</ol></details>`,
			clear: true,
			nopointer: true
		},
		factory_reset: {
			name: "重置此扩展",
			clear: true,
			restart: true,
			intro: "删除《桌面大战》的所有相关配置（还原到初始状态）。初始状态重启游戏后生效。",
			onclick: () => {
				if (!confirm("是否重置此扩展？\n《桌面大战》的所有相关配置都会被删除！\n不会影响游戏正常运行。\n初始状态重启游戏后生效。")) return;
				Object.keys(lib.config).forEach(value => {
					if (value.indexOf("extension_桌面大战_") == 0 && value != "extension_桌面大战_enable") game.saveConfig(value);
				});
				alert("已重置此扩展！\n初始状态重启游戏后生效。");
			}
		}
	},
	package: {
		intro: (() => {
			const hr = document.createElement("hr"), h2 = document.createElement("h2"), img = document.createElement("img");
			h2.append(img);
			img.src = `${lib.assetURL}extension/桌面大战/animation_vs_noname.webp`;
			(({ style }) => {
				style.float = "left";
				style.height = "1.5em";
				style.marginRight = "5px";
			})(img);
			const animationVsNonameRuby = document.createElement("ruby");
			h2.append(animationVsNonameRuby);
			const unlockedTheSecondComingTheChosenOneReturn = (game.getExtensionConfig("桌面大战", "unlocked_characters") || []).includes("avn_the_second_coming_the_chosen_one_return");
			if (unlockedTheSecondComingTheChosenOneReturn) {
				const redSpan = document.createElement("span");
				animationVsNonameRuby.append(redSpan);
				redSpan.style.color = "#CC0000";
				redSpan.textContent = "桌";
				const greenSpan = document.createElement("span");
				animationVsNonameRuby.append(greenSpan);
				greenSpan.style.color = "#66CC00";
				greenSpan.textContent = "面";
				const blueSpan = document.createElement("span");
				animationVsNonameRuby.append(blueSpan);
				blueSpan.style.color = "#33CCFF";
				blueSpan.textContent = "大";
				const yellowSpan = document.createElement("span");
				animationVsNonameRuby.append(yellowSpan);
				yellowSpan.style.color = "#FFCC00";
				yellowSpan.textContent = "战";
			}
			else animationVsNonameRuby.textContent = "桌面大战";
			const leftParenthesisRP = document.createElement("rp");
			animationVsNonameRuby.append(leftParenthesisRP);
			leftParenthesisRP.textContent = "（";
			const animationVsNonameRT = document.createElement("rt");
			animationVsNonameRuby.append(animationVsNonameRT);
			if (unlockedTheSecondComingTheChosenOneReturn) {
				const span = document.createElement("span");
				animationVsNonameRT.append(span);
				span.style.color = "#FF6600";
				span.textContent = "Animation vs. Noname";
			}
			else animationVsNonameRT.textContent = "Animation vs. Noname";
			const rightParenthesisRP = document.createElement("rp");
			animationVsNonameRuby.append(rightParenthesisRP);
			rightParenthesisRP.textContent = "）";
			const citeOuterHTML = (() => {
				const unlockedCharacters = new Set(game.getExtensionConfig("桌面大战", "unlocked_characters") || []), getUnlockableAVAIVCharacters = () => [
					"avn_red",
					"avn_green",
					"avn_blue",
					"avn_yellow"
				].filter(value => !unlockedCharacters.has(value)), getUnlockableAVMCharacters = () => {
					if (!unlockedCharacters.has("avn_herobrine")) return ["avn_herobrine"];
					if (!unlockedCharacters.has("avn_purple")) return ["avn_purple"];
					if (unlockedCharacters.has("avn_virabot") && !unlockedCharacters.has("avn_king_orange")) return ["avn_king_orange"];
					return [];
				}, getUnlockableAVAVCharacters = () => unlockedCharacters.has("avn_purple") ? ["avn_virabot"].filter(value => !unlockedCharacters.has(value)) : [], getUnlockableAVAVICharacters = () => unlockedCharacters.has("avn_king_orange") ? ["avn_agent"].filter(value => !unlockedCharacters.has(value)) : [], getUnlockableCharacters = () => {
					const unlockableAVMCharacters = getUnlockableAVMCharacters();
					if (unlockableAVMCharacters.length) return unlockableAVMCharacters;
					const unlockableAVAVCharacters = getUnlockableAVAVCharacters();
					if (unlockableAVAVCharacters.length) return unlockableAVAVCharacters;
					return getUnlockableAVAVICharacters();
				};
				for (const getCharacters of [
					() => {
						if (!unlockedCharacters.has("avn_victim")) return ["avn_victim"];
						if (!unlockedCharacters.has("avn_the_chosen_one")) return ["avn_the_chosen_one"];
						if (!unlockedCharacters.has("avn_the_dark_lord")) return ["avn_the_dark_lord"];
						if (!unlockedCharacters.has("avn_the_second_coming")) return ["avn_the_second_coming"];
						const unlockableAVAIVCharacters = getUnlockableAVAIVCharacters();
						if (unlockableAVAIVCharacters.length) return unlockableAVAIVCharacters;
						return getUnlockableAVAVCharacters();
					},
					() => {
						if (!unlockedCharacters.has("avn_the_dark_lord")) return ["avn_the_dark_lord"];
						const unlockableAVAVCharacters = getUnlockableAVAVCharacters();
						if (unlockableAVAVCharacters.length) return unlockableAVAVCharacters;
						return getUnlockableAVAVICharacters();
					},
					getUnlockableAVAVCharacters,
					() => {
						const unlockableAVAIVCharacters = getUnlockableAVAIVCharacters();
						if (unlockableAVAIVCharacters.length) return unlockableAVAIVCharacters;
						return getUnlockableCharacters();
					},
					getUnlockableCharacters,
					getUnlockableAVMCharacters
				]) {
					const characters = getCharacters();
					if (!characters.length) continue;
					const cite = document.createElement("cite");
					cite.textContent = characters.reduce((previousValue, currentValue) => `${previousValue}“${lib.avnCharacterTitle[currentValue]}”`, "");
					return `${cite.outerHTML}${hr.outerHTML}`;
				}
				return "";
			})();
			const cite = document.createElement("cite");
			cite.textContent = "当传说中的那5个火柴人，不经意间闯入了你的无名杀……";
			const animatorVsAnimationRuby = document.createElement("ruby");
			animatorVsAnimationRuby.textContent = "Animator vs. Animation";
			animatorVsAnimationRuby.append(leftParenthesisRP.cloneNode());
			const animatorVsAnimationRT = document.createElement("rt");
			animatorVsAnimationRuby.append(animatorVsAnimationRT);
			animatorVsAnimationRT.textContent = "火柴人VS动画师";
			animatorVsAnimationRuby.append(rightParenthesisRP.cloneNode());
			return `${h2.outerHTML}${hr.outerHTML}${citeOuterHTML}${cite.outerHTML}${hr.outerHTML}一个基于《${animatorVsAnimationRuby.outerHTML}》系列的同人《无名杀》扩展，不隶属于Alan Becker等相关创作者。${hr.outerHTML}`;
		})(),
		author: "Show-K",
		diskURL: "https://github.com/Show-K/animation-vs-noname",
		forumURL: "https://github.com/Show-K/animation-vs-noname/issues",
		version: "2",
		changeLog: [
			`<h2><img style="float: left; height: 1.5em; margin-right: 5px;" src="${lib.assetURL}extension/桌面大战/animation_vs_noname.webp"><ruby>更新日志<rp>（</rp><rt>2</rt><rp>）</rp></ruby></h2>`,
			`<ol>${[
				"新武将：Herobrine（待解锁）；",
				"新武将：<ruby>紫<rp>（</rp><rt>Purple</rt><rp>）</rp></ruby>（待解锁）；",
				"新武将：<ruby>橙国王<rp>（</rp><rt>King Orange</rt><rp>）</rp></ruby>（待解锁）；",
				"新武将：Alexcrafter28；",
				"新武将：<ruby>监守者<rp>（</rp><rt>Warden</rt><rp>）</rp></ruby>；",
				"新卡牌包：<ruby>桌面大战<rp>（</rp><rt>Animation vs. Noname</rt><rp>）</rp></ruby>；",
				"调整了<ruby>艾伦·贝克尔<rp>（</rp><rt>Alan Becker</rt><rp>）</rp></ruby>〖赋名〗；",
				"修复了一些小问题。"
			].reduce((previousValue, currentValue) => `${previousValue}<li>${currentValue}</li>`, "")}</ol>`
		].join("")
	}
}));
