"use strict";
game.import("extension", (lib, game, ui, get, ai, _status) => {
	const fileSystemAvailable = Boolean(game.download);
	let animationVsNonameImageSrc;
	if (fileSystemAvailable) animationVsNonameImageSrc = `${lib.assetURL}extension/桌面大战/animation_vs_noname.webp`;
	else game.getDB("image", "extension-桌面大战:animation_vs_noname.webp").then(value => animationVsNonameImageSrc = value);
	lib.avnCharacterTitle = {
		avn_alan_becker: "动画师",
		avn_victim: "起源",
		avn_the_chosen_one: "叛逆",
		avn_the_dark_lord: "宿敌",
		avn_the_second_coming: "出神入化",
		avn_the_second_coming_the_chosen_one_return: "归来",
		avn_red: "蓄势待发",
		avn_yellow: "足智多谋",
		avn_green: "鬼斧神工",
		avn_blue: "返璞归真",
		avn_virabot: "恶意",
		avn_agent: "控制",
		avn_herobrine: "传说",
		avn_purple: "追求",
		avn_dark_blue: "遥远",
		avn_pink: "落花",
		avn_king_orange: "执念",
		avn_gold: "稚子",
		avn_butcher: "厨艺大师",
		avn_alexcrafter28: "世界奇闻者",
		ska_warden: "循声守卫",
		sst_mario: "炎烈意决",
		avn_euler_identity: "真理",
		sst_kirby: "灯火之星",
		avn_corn_dog_guy: "适逢其时"
	};
	lib.avnCharacterUnlockingMap = new Map([
		[["avn_victim"], ["avn_alan_becker"]],
		[["avn_the_chosen_one"], ["avn_alan_becker"]],
		[["avn_the_dark_lord"], ["avn_alan_becker", "avn_the_chosen_one"]],
		[["avn_the_second_coming"], ["avn_alan_becker", "avn_the_chosen_one", "avn_the_dark_lord"]],
		[["avn_red", "avn_yellow", "avn_green", "avn_blue"], ["avn_alan_becker", "avn_the_chosen_one", "avn_the_dark_lord", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return"]],
		[["avn_herobrine"], ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue"]],
		[["avn_purple"], ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue", "avn_herobrine"]],
		[["avn_virabot"], ["avn_alan_becker", "avn_the_chosen_one", "avn_the_dark_lord", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue"]],
		[["avn_king_orange"], ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue", "avn_herobrine", "avn_purple"]],
		[["avn_butcher"], ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue", "avn_king_orange"]],
		[["avn_agent"], ["avn_victim", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return"]],
		[["avn_euler_identity"], ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return"]]
	]);
	lib.avnHiddenCharacters = new Set([
		"avn_the_second_coming_the_chosen_one_return",
		"avn_dark_blue",
		"avn_pink",
		"avn_gold"
	]);
	return {
		name: "桌面大战",
		content: (config, pack) => {
			if (fileSystemAvailable && typeof game.shijianCreateProgress != "function") {
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
			const {
				arenaReady, avnHiddenCharacters, characterPack, rank
			} = lib;
			if (fileSystemAvailable) arenaReady.push(() => {
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
			const characters = Object.keys(characterPack.animation_vs_noname);
			rank.rarity.rare.addArray(characters);
			rank.bp.addArray(characters);
			const confirmedUnlockedCharacters = lib.config.avn_confirmed_unlocked_characters ??= [], newUnlockedCharacters = lib.config.avn_unlocked_characters?.filter(value => !confirmedUnlockedCharacters.includes(value));
			if (newUnlockedCharacters?.length) {
				confirmedUnlockedCharacters.addArray(newUnlockedCharacters);
				game.saveConfigValue("avn_confirmed_unlocked_characters");
				arenaReady.push(() => {
					const dialog = ui.create.dialog((() => {
						const ruby = document.createElement("ruby"), style = ruby.style;
						style.fontSize = "2em";
						style.fontWeight = "bold";
						const newUnlockedHiddenCharacters = newUnlockedCharacters.some(value => avnHiddenCharacters.has(value));
						if (newUnlockedHiddenCharacters) {
							const redSpan = document.createElement("span");
							ruby.append(redSpan);
							redSpan.style.color = "#C00";
							redSpan.textContent = "武";
							const greenSpan = document.createElement("span");
							ruby.append(greenSpan);
							greenSpan.style.color = "#6C0";
							greenSpan.textContent = "将";
							const blueSpan = document.createElement("span");
							ruby.append(blueSpan);
							blueSpan.style.color = "#3CF";
							blueSpan.textContent = "解";
							const yellowSpan = document.createElement("span");
							ruby.append(yellowSpan);
							yellowSpan.style.color = "#FC0";
							yellowSpan.textContent = "锁";
						} else ruby.textContent = "武将解锁";
						const leftParenthesisRP = document.createElement("rp");
						ruby.append(leftParenthesisRP);
						leftParenthesisRP.textContent = "（";
						const rt = document.createElement("rt");
						ruby.append(rt);
						if (newUnlockedHiddenCharacters) {
							const span = document.createElement("span");
							rt.append(span);
							span.style.color = "#F60";
							span.textContent = "Character Unlocked";
						} else rt.textContent = "Character Unlocked";
						const rightParenthesisRP = document.createElement("rp");
						ruby.append(rightParenthesisRP);
						rightParenthesisRP.textContent = "）";
						return ruby.outerHTML;
					})(), "hidden");
					if (newUnlockedCharacters.length == 1) {
						const newUnlockedCharacter = newUnlockedCharacters[0];
						dialog.add((() => {
							const span = document.createElement("span"), style = span.style;
							style.fontSize = "1.5em";
							style.fontWeight = "bold";
							span.textContent = get.translation(newUnlockedCharacter);
							return span.outerHTML;
						})());
						dialog.addText((() => {
							const span = document.createElement("span"), style = span.style;
							style.fontSize = "1.17em";
							style.fontWeight = "bold";
							span.textContent = lib.characterTitle[newUnlockedCharacter];
							return span.outerHTML;
						})());
					}
					if (newUnlockedCharacters.length > 3) dialog.addSmall([newUnlockedCharacters, "character"], true);
					else dialog.add([newUnlockedCharacters, "character"], true);
					dialog.classList.add("forcebutton", "withbg");
					dialog.addText(`查看：选项→武将→桌面大战`);
					const resetGameTimeout = window.resetGameTimeout;
					if (typeof resetGameTimeout != "undefined") {
						clearTimeout(resetGameTimeout);
						delete window.resetGameTimeout;
					}
					dialog.open();
					const auto = ui.auto;
					let hidden = false;
					if (!auto.classList.contains("hidden")) {
						auto.hide();
						hidden = true;
					}
					game.pause();
					const control = ui.create.control("确定", () => {
						dialog.close();
						control.close();
						if (hidden) auto.show();
						game.resume();
					});
				});
			}
			if (pack.changeLog) game.showExtensionChangeLog(pack.changeLog);
		},
		precontent: data => {
			if (!data.enable) return;
			if (parseInt(navigator.userAgent.match(/Chrom(?:e|ium)\/(\d+)/)[1]) <= 51) {
				alert(`《无名杀》由理版（Windows）或由理兼容版不支持运行《桌面大战》。`);
				return;
			}
			const isArray = Array.isArray, {
				saveConfig,
				saveConfigValue,
				saveExtensionConfig
			} = game;
			if (!isArray(lib.config.avn_unlocked_characters)) saveConfig("avn_unlocked_characters", []);
			if (!isArray(lib.config.avn_confirmed_unlocked_characters)) saveConfig("avn_confirmed_unlocked_characters", []);
			game.lockTheSecondComingTheChosenOneReturn = () => {
				const unlockedCharacters = lib.config.avn_unlocked_characters;
				if (unlockedCharacters) {
					unlockedCharacters.remove("avn_the_second_coming_the_chosen_one_return");
					saveConfigValue("avn_unlocked_characters");
				}
				const confirmedUnlockedCharacters = lib.config.avn_confirmed_unlocked_characters;
				if (!confirmedUnlockedCharacters) return;
				confirmedUnlockedCharacters.remove("avn_the_second_coming_the_chosen_one_return");
				saveConfigValue("avn_confirmed_unlocked_characters");
			};
			game.unlockAllAnimationVsNonameCharacters = () => {
				let unlocked = false;
				const unlockedCharacters = lib.config.avn_unlocked_characters ??= [];
				Object.entries(lib.characterPack.animation_vs_noname).forEach(([key, heroData]) => {
					if (!heroData[4].includes("unseen")) return;
					if (!unlocked) unlocked = true;
					unlockedCharacters.add(key);
				});
				if (unlocked) saveConfigValue("avn_unlocked_characters");
			};
			game.unlockAllAnimationVsNonameCharactersExceptHidden = () => {
				const hiddenCharacters = lib.avnHiddenCharacters, unlockedCharacters = lib.config.avn_unlocked_characters ??= [];
				let unlocked = false;
				Object.entries(lib.characterPack.animation_vs_noname).forEach(([key, heroData]) => {
					if (hiddenCharacters.has(key) || !heroData[4].includes("unseen")) return;
					if (!unlocked) unlocked = true;
					unlockedCharacters.add(key);
				});
				if (unlocked) saveConfigValue("avn_unlocked_characters");
			};
			const {
				config: {
					all: {
						cards: allCards,
						characters: allCharacters
					}
				},
				init: {
					css,
					js,
					jsForExtension
				},
				onload,
				translate
			} = lib, uiCSS = ui.css, {
				card_style,
				card_stylesheet,
				cardback_style,
				cardback_stylesheet,
				cardback_stylesheet2
			} = uiCSS;
			card_style.remove();
			if (card_stylesheet) {
				card_stylesheet.remove();
				delete uiCSS.card_stylesheet;
			}
			cardback_style.remove();
			if (cardback_stylesheet) {
				cardback_stylesheet.remove();
				delete uiCSS.cardback_stylesheet;
			}
			if (cardback_stylesheet2) {
				cardback_stylesheet2.remove();
				delete uiCSS.cardback_stylesheet2;
			}
			if (fileSystemAvailable) {
				const animationVsNonameDirectory = `${lib.assetURL}extension/桌面大战`;
				css(animationVsNonameDirectory, "extension");
				uiCSS.card_style = css(`${animationVsNonameDirectory}/theme/style/card`, "avn_metro");
				uiCSS.cardback_style = css(`${animationVsNonameDirectory}/theme/style/cardback`, "avn_metro");
			} else {
				css("db:extension-桌面大战", "extension");
				Promise.all([
					game.getDB("image", "extension-桌面大战:theme/style/card/avn_metro.css"),
					game.getDB("image", "extension-桌面大战:theme/style/card/image/avn_metro.webp")
				]).then(value => URL.createObjectURL(new Blob([
					lib.init.decode(value[0].replace(/^data:[\s\S]*\/[\s\S]*;base64,/, "")).replace(/image\/avn_metro\.webp/g, value[1])
				]))).then(value => uiCSS.card_style = css(value));
				Promise.all([
					game.getDB("image", "extension-桌面大战:theme/style/cardback/avn_metro.css"),
					game.getDB("image", "extension-桌面大战:theme/style/cardback/image/avn_metro.webp"),
					game.getDB("image", "extension-桌面大战:theme/style/cardback/image/avn_metro2.webp")
				]).then(value => URL.createObjectURL(new Blob([
					lib.init.decode(value[0].replace(/^data:[\s\S]*\/[\s\S]*;base64,/, "")).replace(/image\/avn_metro\.webp/g, value[1]).replace(/image\/avn_metro2\.webp/g, value[2])
				]))).then(value => uiCSS.cardback_style = css(value));
			}
			if (!data.imported) {
				saveExtensionConfig("桌面大战", "imported", true);
				const {
					cards,
					characters
				} = lib.config;
				cards.add("animation_vs_noname");
				cards.add("animation_vs_noname_internet");
				saveConfigValue("cards");
				characters.add("animation_vs_noname");
				saveConfigValue("characters");
			}
			onload.push(() => {
				allCards.add("animation_vs_noname");
				allCards.add("animation_vs_noname_internet");
				allCharacters.add("animation_vs_noname");
			});
			translate.animation_vs_noname_card_config = "桌面大战";
			translate.animation_vs_noname_character_config = "桌面大战";
			translate.animation_vs_noname_internet_card_config = "桌战IN";
			const animationVsNonameDirectory = fileSystemAvailable ? `${lib.assetURL}extension/桌面大战/` : "db:extension-桌面大战:", cardDirectory = `${animationVsNonameDirectory}card`;
			jsForExtension(cardDirectory, "animation_vs_noname");
			jsForExtension(cardDirectory, "animation_vs_noname_internet");
			jsForExtension(`${animationVsNonameDirectory}character`, "animation_vs_noname");
			css("https://npm.onmicrosoft.cn/comment-core-library/dist/css", "style.min");
			js("https://npm.onmicrosoft.cn/comment-core-library/dist", "CommentCoreLibrary.min", () => js("https://npm.onmicrosoft.cn/socket.io-client/dist", "socket.io.min", () => {
				const CM = new CommentManager(document.body);
				CM.init();
				CM.start();
				const socket = io("https://socketrhythmized.glitch.me", {
					query: {
						connectNickname: get.connectNickname()
					}
				});
				socket.on("danmaku", danmaku => CM.send(danmaku));
				socket.on("disconnect", () => CM.send({
					text: "正在从服务器断开连接",
					mode: 1,
					size: 25,
					color: 0xFFFFFF,
					border: false,
					shadow: true
				}));
			}));
		},
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
						} else {
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
					"每回合限一次，当你使用牌指定距离大于1的角色为目标后，若你的装备区内有带有「一次」标签的牌，你可以弃置其区域内的一张牌。",
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
					const {
						saveConfig,
						saveExtensionConfig
					} = game;
					saveExtensionConfig("桌面大战", "imported");
					Object.keys(lib.config).forEach(key => {
						if (key.startsWith("avn_")) saveConfig(key);
					});
					alert("已重置此扩展！\n初始状态重启游戏后生效。");
				}
			}
		},
		package: {
			get intro() {
				const hr = document.createElement("hr"), h2 = document.createElement("h2"), image = new Image();
				image.id = "animation-vs-noname-image";
				image.src = animationVsNonameImageSrc;
				const style = image.style;
				style.float = "left";
				style.height = "1.5em";
				style.marginRight = "5px";
				h2.append(image);
				const animationVsNonameRuby = document.createElement("ruby");
				h2.append(animationVsNonameRuby);
				const unlockedTheSecondComingTheChosenOneReturn = lib.config.avn_unlocked_characters?.includes("avn_the_second_coming_the_chosen_one_return");
				if (unlockedTheSecondComingTheChosenOneReturn) {
					const redSpan = document.createElement("span");
					animationVsNonameRuby.append(redSpan);
					redSpan.style.color = "#C00";
					redSpan.textContent = "桌";
					const greenSpan = document.createElement("span");
					animationVsNonameRuby.append(greenSpan);
					greenSpan.style.color = "#6C0";
					greenSpan.textContent = "面";
					const blueSpan = document.createElement("span");
					animationVsNonameRuby.append(blueSpan);
					blueSpan.style.color = "#3CF";
					blueSpan.textContent = "大";
					const yellowSpan = document.createElement("span");
					animationVsNonameRuby.append(yellowSpan);
					yellowSpan.style.color = "#FC0";
					yellowSpan.textContent = "战";
				} else animationVsNonameRuby.textContent = "桌面大战";
				const leftParenthesisRP = document.createElement("rp");
				animationVsNonameRuby.append(leftParenthesisRP);
				leftParenthesisRP.textContent = "（";
				const animationVsNonameRT = document.createElement("rt");
				animationVsNonameRuby.append(animationVsNonameRT);
				if (unlockedTheSecondComingTheChosenOneReturn) {
					const span = document.createElement("span");
					animationVsNonameRT.append(span);
					span.style.color = "#F60";
					span.textContent = "Animation vs. Noname";
				} else animationVsNonameRT.textContent = "Animation vs. Noname";
				const rightParenthesisRP = document.createElement("rp");
				animationVsNonameRuby.append(rightParenthesisRP);
				rightParenthesisRP.textContent = "）";
				const characterUnlockingHint = (() => {
					const unlockedCharacters = new Set(lib.config.avn_unlocked_characters);
					for (const key of lib.avnCharacterUnlockingMap.keys()) {
						if (key.every(unlockedCharacters.has, unlockedCharacters)) continue;
						const cite = document.createElement("cite"), characterTitle = lib.avnCharacterTitle;
						cite.textContent = key.reduce((textContent, unlockingCharacter) => `${textContent}“${characterTitle[unlockingCharacter]}”`, "");
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
				return `${h2.outerHTML}${hr.outerHTML}${characterUnlockingHint}${cite.outerHTML}${hr.outerHTML}一个基于《${animatorVsAnimationRuby.outerHTML}》系列的同人《无名杀》扩展，不隶属于Alan Becker等相关创作者。${hr.outerHTML}`;
			},
			author: "Show-K",
			diskURL: "https://github.com/Tipx-L/animation-vs-noname",
			forumURL: "https://github.com/Tipx-L/animation-vs-noname/issues",
			version: "2",
			get changeLog() {
				return [
					`<h2><img style="float: left; height: 1.5em; margin-right: 5px;" src="${animationVsNonameImageSrc}"><ruby>更新日志<rp>（</rp><rt>2</rt><rp>）</rp></ruby></h2>`,
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
				].join("");
			}
		}
	};
});
