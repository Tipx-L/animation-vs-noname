"use strict";
game.import("extension", (lib, game, ui, get, ai, _status) => {
	return {
		name: "桌面大战",
		content: (config, pack) => {
			const ANIMATION_VS_NONAME = "桌面大战";
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
				if (lib.extensionPack[ANIMATION_VS_NONAME]) {
					const address = `https://nonameShijian.unitedrhythmized.club/noname-android-extension/main/extension/${ANIMATION_VS_NONAME}/`;
					fetch(`${address}update.js?date=${(new Date()).getTime()}`)
						.then(response => {
							if (!response.ok) throw response;
							return response.text();
						})
						.then(text => {
							const data = eval(text);
							console.log(data);
							const localVersion = lib.extensionPack[ANIMATION_VS_NONAME].version || "0";
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
										for (let i = 0; i < version_1.length && i < version_2.length; i++) {
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

							myConfirm(`《${ANIMATION_VS_NONAME}》扩展检测到更新（${data.version}），是否更新？\n${data.changeLog}`, () => {
								/**
								 * @param { string } url 
								 */
								function download(url, success, error) {
									const path = `extension/${ANIMATION_VS_NONAME}`;
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
									const progress = game.shijianCreateProgress(`更新《${ANIMATION_VS_NONAME}》扩展`, files.length, files[0], i);
									const success = skip => {
										if (!files[++i]) {
											progress.setProgressValue(files.length);
											progress.setFileName("下载完成");
											setTimeout(() => {
												progress.remove();
												setTimeout(() => {
													alert(`《${ANIMATION_VS_NONAME}》扩展更新完成，将自动重启`);
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
							else if (e instanceof Response) console.error(`${ANIMATION_VS_NONAME}: ${e.statusText}`);
							else console.error("其他错误", e);
						});
				} else {
					console.error(`lib.extensionPack.${ANIMATION_VS_NONAME}不存在，无法在线更新`);
				}
			});
			const RANK = {
				s: [],
				ap: [],
				a: [],
				am: [],
				bp: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one", "avn_the_dark_lord", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_s_return", "avn_red", "avn_green", "avn_blue", "avn_yellow", "avn_herobrine", "avn_purple", "avn_dark_blue", "avn_pink", "avn_king_orange", "avn_gold", "avn_alexcrafter28", "ska_warden"],
				b: [],
				bm: [],
				c: [],
				d: [],
				rarity: {
					legend: [],
					epic: [],
					rare: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one", "avn_the_dark_lord", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_s_return", "avn_red", "avn_green", "avn_blue", "avn_yellow", "avn_herobrine", "avn_purple", "avn_dark_blue", "avn_pink", "avn_king_orange", "avn_gold", "avn_alexcrafter28", "ska_warden"],
					junk: []
				}
			};
			if (lib.config.game == "super_smash_tabletop") {
				RANK.bp.remove("ska_warden");
				RANK.rarity.rare.remove("ska_warden");
			}
			for (const rank in RANK) {
				if (rank == "rarity") for (const rarity in RANK[rank]) {
					if (!Array.isArray(lib.rank[rank][rarity])) lib.rank[rank][rarity] = [];
					lib.rank[rank][rarity].addArray(RANK[rank][rarity]);
				}
				else {
					if (!Array.isArray(lib.rank[rank])) lib.rank[rank] = [];
					lib.rank[rank].addArray(RANK[rank]);
				}
			}
			if (!Array.isArray(config.unlocked_characters)) config.unlocked_characters = [];
			if (config.unlocked_characters.contains("avn_the_second_coming_the_chosen_one_s_return")) lib.extensionMenu[`extension_${ANIMATION_VS_NONAME}`].intro.name = lib.extensionMenu[`extension_${ANIMATION_VS_NONAME}`].intro.name.replace(`${ANIMATION_VS_NONAME}<rp>（</rp><rt>Animation vs. Noname</rt><rp>）</rp>`, `<span style="color: #cc0000;">桌</span><span style="color: #66cc00;">面</span><span style="color: #33ccff;">大</span><span style="color: #ffcc00;">战</span><rp>（</rp><rt><span style="color: #ff6600;">Animation vs. Noname</span></rt><rp>）</rp>`);
			const hiddenCharacters = ["avn_the_second_coming_the_chosen_one_s_return", "avn_dark_blue", "avn_pink", "avn_gold"];
			for (const character in lib.characterPack.animation_vs_noname) {
				if (!hiddenCharacters.contains(character) && lib.characterPack.animation_vs_noname[character][4].contains("unseen")) {
					const fightingStickFigures = ["avn_red", "avn_green", "avn_blue", "avn_yellow"];
					if (fightingStickFigures.contains(character)) lib.extensionMenu[`extension_${ANIMATION_VS_NONAME}`].intro.name = `<p><cite>${fightingStickFigures.reduce((previousValue, currentValue) => {
						if (lib.characterPack.animation_vs_noname[currentValue][4].contains("unseen")) return `${previousValue}“${lib.characterTitle[currentValue]}”`;
						return previousValue;
					}, "")}</cite></p>${lib.extensionMenu[`extension_${ANIMATION_VS_NONAME}`].intro.name}`;
					else lib.extensionMenu[`extension_${ANIMATION_VS_NONAME}`].intro.name = `<p><cite>“${lib.characterTitle[character]}”</cite></p>${lib.extensionMenu[`extension_${ANIMATION_VS_NONAME}`].intro.name}`;
					break;
				}
			}
			if (!Array.isArray(config.confirmed_unlocked_characters)) config.confirmed_unlocked_characters = [];
			const newUnlockedCharacters = config.unlocked_characters.filter(value => !config.confirmed_unlocked_characters.contains(value));
			if (newUnlockedCharacters.length) {
				lib.config[`extension_${ANIMATION_VS_NONAME}_confirmed_unlocked_characters`].addArray(newUnlockedCharacters);
				game.saveConfig(`extension_${ANIMATION_VS_NONAME}_confirmed_unlocked_characters`, lib.config[`extension_${ANIMATION_VS_NONAME}_confirmed_unlocked_characters`]);
				lib.arenaReady.push(() => {
					const dialog = ui.create.dialog(newUnlockedCharacters.some(value => hiddenCharacters.contains(value)) ? `<ruby style="font-size: 2em; font-weight: bold;"><span style="color: #cc0000;">武</span><span style="color: #66cc00;">将</span><span style="color: #33ccff;">解</span><span style="color: #ffcc00;">锁</span><rp>（</rp><rt><span style="color: #ff6600;">Character Unlocked</span></rt><rp>）</rp></ruby>` : `<ruby style="font-size: 2em; font-weight: bold;">武将解锁<rp>（</rp><rt>Character Unlocked</rt><rp>）</rp></ruby>`, "hidden");
					if (newUnlockedCharacters.length == 1) {
						const newUnlockedCharacter = newUnlockedCharacters[0];
						dialog.add(`<span style="font-size: 1.5em; font-weight: bold;">${get.translation(newUnlockedCharacter)}</span>`);
						dialog.addText(`<span style="font-size: 1.17em; font-weight: bold;">${lib.characterTitle[newUnlockedCharacter]}</span>`);
					}
					if (newUnlockedCharacters.length > 3) dialog.addSmall([newUnlockedCharacters, "character"], true);
					else dialog.add([newUnlockedCharacters, "character"], true);
					dialog.classList.add("forcebutton", "withbg");
					dialog.addText(`查看：选项→武将→${ANIMATION_VS_NONAME}`);
					clearTimeout(window.resetGameTimeout);
					delete window.resetGameTimeout;
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
			const ANIMATION_VS_NONAME = "桌面大战";
			const isCompatibleRelease = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]) <= 51;
			if (isCompatibleRelease) {
				const library = ["core-js-bundle"];
				if (typeof forge == "object") forge.setDependencyLibrary(ANIMATION_VS_NONAME, library);
				else {
					alert(`《无名杀》由理版（Windows）/由理兼容版运行《${ANIMATION_VS_NONAME}》需要安装《锻造》。`);
					return;
				}
			}
			lib.init.css(`${lib.assetURL}extension/${ANIMATION_VS_NONAME}`, "extension");
			if (!Array.isArray(data.unlocked_characters)) game.saveConfig(`extension_${ANIMATION_VS_NONAME}_unlocked_characters`, []);
			if (!Array.isArray(data.confirmed_unlocked_characters)) game.saveConfig(`extension_${ANIMATION_VS_NONAME}_confirmed_unlocked_characters`, []);
			if (!data.imported) {
				game.saveConfig(`extension_${ANIMATION_VS_NONAME}_imported`, true);
				lib.config.characters.add("animation_vs_noname");
				game.saveConfig("characters", characters);
				lib.config.cards.add("animation_vs_noname");
				game.saveConfig("cards", cards);
			}
			if (typeof lib.decade_extCardImage != "object") lib.decade_extCardImage = {};
			if (isCompatibleRelease) {
				lib.init.js(`${lib.assetURL}extension/${ANIMATION_VS_NONAME}/character`, "animation_vs_noname_compatible");
				lib.init.js(`${lib.assetURL}extension/${ANIMATION_VS_NONAME}/card`, "animation_vs_noname_compatible");
			}
			else {
				lib.init.js(`${lib.assetURL}extension/${ANIMATION_VS_NONAME}/character`, "animation_vs_noname");
				lib.init.js(`${lib.assetURL}extension/${ANIMATION_VS_NONAME}/card`, "animation_vs_noname");
			}
			lib.config.all.characters.add("animation_vs_noname");
			lib.config.all.cards.add("animation_vs_noname");
			lib.translate.animation_vs_noname_character_config = ANIMATION_VS_NONAME;
			lib.translate.animation_vs_noname_card_config = ANIMATION_VS_NONAME;
		},
		onremove: () => game.saveConfig("extension_桌面大战_imported"),
		help: {
			"桌面大战": `<div style="margin: 10px;">
					新机制
				</div>
				<ul style="margin-top: 0;">
					<li>
						延伸
						<ul style="padding-left: 20px; padding-top: 5px;">
							<li>
								当你使用基本牌或普通锦囊牌选择其他角色为唯一目标后，若你的装备区内有带有「延伸」标签的牌，你可以增加至多最大「延伸」量名角色为目标（你与其之间的存活角色数大于你与目标之间，且上述除你以外的所有角色的座位连续）。若你的装备区内有能弃置的带有「延伸」「一次」标签的牌，你先弃置装备区内的一张带有「延伸」「一次」标签的牌。
							</li>
						</ul>
					</li>
					<li>
						一次
						<ul style="padding-left: 20px; padding-top: 5px;">
							<li>
								当你使用有距离限制的牌指定目标后，若你的装备区内有带有「一次」标签的牌，且你与其距离大于1，你弃置装备区内的一张带有「一次」标签的牌，并弃置其区域内的一张牌。
							</li>
						</ul>
					</li>
					<li>
						可抛
						<ul style="padding-left: 20px; padding-top: 5px;">
							<li>
								出牌阶段，你可以弃置装备区内的一张带有「可抛」标签的牌，对一名与你的座次不相邻的其他角色造成1点伤害。
							</li>
						</ul>
					</li>
					<li>
						劈开
						<ul style="padding-left: 20px; padding-top: 5px;">
							<li>
								当你使用基本牌或普通锦囊牌选择目标后，若你的装备区内有带有「劈开」标签的牌，你可以增加一名与你的座次相邻的角色为目标。若你的装备区内有能弃置的带有「一次」「劈开」标签的牌，你先弃置装备区内的一张带有「一次」「劈开」标签的牌。
							</li>
						</ul>
					</li>
					<li>
						不动
						<ul style="padding-left: 20px; padding-top: 5px;">
							<li>
								你的装备区内的带有「不动」标签的牌不能被弃置/获得。
							</li>
						</ul>
					</li>
				</ul>`
		},
		config: {
			avn_change_log: {
				name: `<details>
						<summary>
							更新日志（2）
						</summary>
						<ol>
							<li>
								新武将：Herobrine（待解锁）；
							</li>
							<li>
								新武将：<ruby>紫<rp>（</rp><rt>Purple</rt><rp>）</rp></ruby>（待解锁）；
							</li>
							<li>
								新武将：<ruby>橙国王<rp>（</rp><rt>King Orange</rt><rp>）</rp></ruby>（待解锁）；
							</li>
							<li>
								新武将：Alexcrafter28；
							</li>
							<li>
								新武将：<ruby>监守者<rp>（</rp><rt>Warden</rt><rp>）</rp></ruby>；
							</li>
							<li>
								新卡牌包：<ruby>桌面大战<rp>（</rp><rt>Animation vs. Noname</rt><rp>）</rp></ruby>；
							</li>
							<li>
								调整了<ruby>艾伦·贝克尔<rp>（</rp><rt>Alan Becker</rt><rp>）</rp></ruby>〖赋名〗；
							</li>
							<li>
								修复了一些小问题。
							</li>
						</ol>
					</details>`,
				clear: true,
				nopointer: true
			}
		},
		package: {
			intro: `<h2><img style="float: left; height: 1.5em; margin-right: 5px;" src="${lib.assetURL}extension/桌面大战/animation_vs_noname.webp"><ruby>桌面大战<rp>（</rp><rt>Animation vs. Noname</rt><rp>）</rp></ruby></h2><p><cite>当传说中的那5个火柴人，不经意间闯入了你的无名杀……</cite></p><p>一个基于《桌面大战》（《火柴人VS动画师》）系列的同人《无名杀》扩展，不隶属于Alan Becker等相关创作者。</p>`,
			author: "Show-K",
			diskURL: "https://github.com/Show-K/animation-vs-noname",
			forumURL: "https://github.com/Show-K/animation-vs-noname/issues",
			version: "2",
			changeLog: `<h2><img style="float: left; height: 1.5em; margin-right: 5px;" src="${lib.assetURL}extension/桌面大战/animation_vs_noname.webp"><ruby>更新日志<rp>（</rp><rt>2</rt><rp>）</rp></ruby></h2>
				<ol>
					<li>
						新武将：Herobrine（待解锁）；
					</li>
					<li>
						新武将：<ruby>紫<rp>（</rp><rt>Purple</rt><rp>）</rp></ruby>（待解锁）；
					</li>
					<li>
						新武将：<ruby>橙国王<rp>（</rp><rt>King Orange</rt><rp>）</rp></ruby>（待解锁）；
					</li>
					<li>
						新武将：Alexcrafter28；
					</li>
					<li>
						新武将：<ruby>监守者<rp>（</rp><rt>Warden</rt><rp>）</rp></ruby>；
					</li>
					<li>
						新卡牌包：<ruby>桌面大战<rp>（</rp><rt>Animation vs. Noname</rt><rp>）</rp></ruby>；
					</li>
					<li>
						调整了<ruby>艾伦·贝克尔<rp>（</rp><rt>Alan Becker</rt><rp>）</rp></ruby>〖赋名〗；
					</li>
					<li>
						修复了一些小问题。
					</li>
				</ol>`
		}
	};
});
