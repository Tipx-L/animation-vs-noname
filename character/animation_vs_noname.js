"use strict";
game.import("character", (lib, game, ui, get, ai, _status) => {
	/**
	 * @param {string} rubyTextContent
	 * @param {string} rtTextContent
	 */
	const annotate = (rubyTextContent, rtTextContent) => {
		const ruby = document.createElement("ruby");
		ruby.textContent = rubyTextContent;
		const leftParenthesisRP = document.createElement("rp");
		leftParenthesisRP.textContent = "（";
		ruby.append(leftParenthesisRP);
		const rt = document.createElement("rt");
		rt.textContent = rtTextContent;
		ruby.append(rt);
		const rightParenthesisRP = document.createElement("rp");
		rightParenthesisRP.textContent = "）";
		ruby.append(rightParenthesisRP);
		return ruby.outerHTML;
	};
	/**
	 * Insert line break opportunities into a URL.
	 * @param {string} url The URL.
	 */
	const formatURL = url => url
		.split("//")
		.map(subURL => subURL
			.replace(/(?<after>:)/giu, "$1<wbr>")
			.replace(/(?<before>[/~.,\-_?#%])/giu, "<wbr>$1")
			.replace(/(?<beforeAndAfter>[=&])/giu, "<wbr>$1<wbr>"))
		.join("//<wbr>");
	/**
	 * @param {string} character
	 * @returns {number}
	 */
	const getCharacterIndex = character => {
		const hiddenCharacters = lib.avnHiddenCharacters;
		return Object.keys(lib.characterPack.animation_vs_noname).filter(value => !hiddenCharacters.has(value)).indexOf(character);
	};
	const lineBreak = document.createElement("br").outerHTML, thematicBreak = document.createElement("hr").outerHTML;
	/**
	 * @type {AnimationVsNonameImportCharacterConfig}
	 */
	const animationVsNoname = {
		name: "animation_vs_noname",
		connect: true,
		character: {
			avn_alan_becker: ["male", "western", 4, ["avn_animate"], ["border:shu", "ruby"]],
			avn_victim: ["male", "western", 4, ["avn_adaptive"], ["border:wu"]],
			avn_the_chosen_one: ["male", "western", 4, ["avn_overflow"], ["border:wei", "ruby"]],
			avn_the_dark_lord: ["male", "western", 4, ["avn_terminal"], ["border:shu", "ruby"]],
			avn_the_second_coming: ["male", "western", 4, ["avn_frame_by_frame_drawing"], ["border:qun", "ruby"]],
			avn_the_second_coming_the_chosen_one_return: ["male", "western", 4, ["avn_awakening"], ["border:qun", "ruby"]],
			avn_red: ["male", "western", 4, ["avn_combative"], ["border:shu"]],
			avn_yellow: ["male", "western", 4, ["avn_intelligence"], ["border:qun"]],
			avn_green: ["male", "western", 4, ["avn_progressive"], ["border:wu"]],
			avn_blue: ["male", "western", 4, ["avn_midas_touch"], ["border:wei"]],
			avn_virabot: ["none", "western", 4, ["avn_infection"], ["border:shu"]],
			avn_agent: ["male", "western", 4, ["avn_surpression"], ["border:wu"]],
			avn_herobrine: ["male", "western", 4, ["avn_out_of_context"], ["border:wei"]],
			avn_purple: ["male", "western", 4, ["avn_ascending"], ["border:jin"]],
			avn_dark_blue: ["male", "western", 4, ["avn_ascending"], ["border:wei"]],
			avn_pink: ["female", "western", 4, ["avn_ascending"], ["border:jin"]],
			avn_king_orange: ["male", "western", 4, ["avn_resistant"], ["border:qun", "ruby"]],
			avn_gold: ["male", "western", 4, ["avn_resistant"], ["border:qun"]],
			avn_butcher: ["male", "western", 4, ["avn_cookery"], ["border:qun"]],
			avn_alexcrafter28: ["male", "western", 4, ["avn_encounter"], ["border:wu", "ruby"]],
			ska_warden: ["none", "western", "4/10", ["ska_zhenhan"], ["border:wu"]],
			sst_mario: ["male", "western", 4, ["sst_jueyi"], ["border:shu"]],
			avn_euler_identity: ["none", "western", 4, ["avn_mathematics"], ["border:qun", "ruby"]],
			sst_kirby: ["male", "western", 4, ["sst_qushi"], ["border:shu"]],
			avn_corn_dog_guy: ["male", "western", 4, ["avn_rebranding"], ["border:qun", "ruby"]]
		},
		characterFilter: {},
		characterSort: {
			animation_vs_noname: {
				avn_animator_vs_animation: [
					"avn_alan_becker",
					"avn_victim",
					"avn_the_chosen_one",
					"avn_the_dark_lord",
					"avn_the_second_coming",
					"avn_the_second_coming_the_chosen_one_return",
					"avn_red",
					"avn_yellow",
					"avn_green",
					"avn_blue",
					"avn_virabot",
					"avn_agent"
				],
				avn_animation_vs_minecraft: [
					"avn_herobrine",
					"avn_purple",
					"avn_dark_blue",
					"avn_pink",
					"avn_king_orange",
					"avn_gold",
					"avn_butcher",
					"avn_alexcrafter28",
					"ska_warden"
				],
				avn_animation_vs_super_mario_bros: [
					"sst_mario"
				],
				avn_animation_vs_math: [
					"avn_euler_identity"
				],
				avn_actual_shorts: [
					"sst_kirby",
					"avn_corn_dog_guy"
				]
			}
		},
		characterIntro: {
			get avn_alan_becker() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker、Bradley G. Munkowitz",
					thematicBreak,
					`AvN${getCharacterIndex("avn_alan_becker")}. Alan Becker`,
					lineBreak,
					"首次登场：Animator vs. Animation",
					thematicBreak,
					"伴随火柴人们一起成长。"
				].join("");
			},
			get avn_victim() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：救赎",
					thematicBreak,
					`AvN${getCharacterIndex("avn_victim")}. Victim`,
					lineBreak,
					"首次登场：Animator vs. Animation",
					thematicBreak,
					"万物起源。"
				].join("");
			},
			get avn_the_chosen_one() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：救赎",
					thematicBreak,
					`AvN${getCharacterIndex("avn_the_chosen_one")}. The Chosen One`,
					lineBreak,
					"首次登场：Animator vs. Animation II",
					thematicBreak,
					"奋起反抗。"
				].join("");
			},
			get avn_the_dark_lord() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_the_dark_lord")}. The Dark Lord`,
					lineBreak,
					"首次登场：Animator vs. Animation III",
					thematicBreak,
					"“mission.The_Dark_Lord = destroy(The_Chosen_One);”"
				].join("");
			},
			get avn_the_second_coming() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：厉眠",
					thematicBreak,
					`AvN${getCharacterIndex("avn_the_second_coming")}. The Second Coming`,
					lineBreak,
					"首次登场：Animator vs. Animation IV",
					thematicBreak,
					"Hey! Need help?"
				].join("");
			},
			get avn_the_second_coming_the_chosen_one_return() {
				const span = document.createElement("span"), style = span.style;
				style.fontSize = "larger";
				style.fontWeight = "bold";
				span.textContent = "You ended my friends. Now I will end you.";
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_the_second_coming")}+. The Second Coming`,
					lineBreak,
					"首次登场：The Showdown - AVA Shorts Episode 4",
					thematicBreak,
					span.outerHTML
				].join("");
			},
			get avn_red() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：厉眠",
					thematicBreak,
					`AvN${getCharacterIndex("avn_red")}. Red`,
					lineBreak,
					"首次登场：Animator vs. Animation IV",
					thematicBreak,
					"身先士卒。"
				].join("");
			},
			get avn_yellow() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_yellow")}. Yellow`,
					lineBreak,
					"首次登场：Animator vs. Animation IV",
					thematicBreak,
					"精益求精。"
				].join("");
			},
			get avn_green() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：厉眠",
					thematicBreak,
					`AvN${getCharacterIndex("avn_green")}. Green`,
					lineBreak,
					"首次登场：Animator vs. Animation IV",
					thematicBreak,
					"锦上添花。"
				].join("");
			},
			get avn_blue() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：厉眠",
					thematicBreak,
					`AvN${getCharacterIndex("avn_blue")}. Blue`,
					lineBreak,
					"首次登场：Animator vs. Animation IV",
					thematicBreak,
					"雪中送炭。"
				].join("");
			},
			get avn_virabot() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_virabot")}. ViraBot`,
					lineBreak,
					"首次登场：The Virus - AVA Shorts Episode 1",
					thematicBreak,
					"突如其来。"
				].join("");
			},
			get avn_agent() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：帆",
					thematicBreak,
					`AvN${getCharacterIndex("avn_agent")}. [Agent]`,
					lineBreak,
					"首次登场：Wanted - Animator vs. Animation VI - Ep 1",
					thematicBreak,
					"一发入魂。"
				].join("");
			},
			get avn_herobrine() {
				const del = document.createElement("del");
				del.textContent = "未";
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_herobrine")}. Herobrine`,
					lineBreak,
					"首次登场：Animation vs. Minecraft",
					thematicBreak,
					`${del.outerHTML}已解之谜。`
				].join("");
			},
			get avn_purple() {
				const unlockedCharacters = lib.config.avn_unlocked_characters;
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_purple")}. Purple`,
					lineBreak,
					"首次登场：The Nether - AVM Shorts Episode 8",
					thematicBreak,
					unlockedCharacters && ["avn_dark_blue", "avn_pink"].some(unlockedCharacters.includes, unlockedCharacters) ? "终于得到了认可。" : "努力得到认可。"
				].join("");
			},
			get avn_dark_blue() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：林、阿陌",
					thematicBreak,
					`AvN${getCharacterIndex("avn_purple")}-1. Dark Blue`,
					lineBreak,
					"首次登场：Note Block Universe - AVM Shorts Episode 29",
					thematicBreak,
					"再也无法挽留。"
				].join("");
			},
			get avn_pink() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：林、阿陌",
					thematicBreak,
					`AvN${getCharacterIndex("avn_purple")}-2. Pink`,
					lineBreak,
					"首次登场：Note Block Universe - AVM Shorts Episode 29",
					thematicBreak,
					"再也无法触及。"
				].join("");
			},
			get avn_king_orange() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：救赎",
					thematicBreak,
					`AvN${getCharacterIndex("avn_king_orange")}. King Orange`,
					lineBreak,
					"首次登场：Parkour - AVM Shorts Episode 22",
					thematicBreak,
					lib.config.avn_unlocked_characters?.includes("avn_gold") ? "不想失去任何人了。不能失去任何人了。" : "不想输给任何人了。不能输给任何人了。"
				].join("");
			},
			get avn_gold() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_king_orange")}-1. Gold`,
					lineBreak,
					"首次登场：The King - AVM Shorts Episode 30",
					thematicBreak,
					"再也无法陪伴。"
				].join("");
			},
			get avn_butcher() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_butcher")}. Butcher`,
					lineBreak,
					"首次登场：Titan Ravager - AVM Shorts Episode 23",
					thematicBreak,
					"大师食谱其实已经在你的手……啊！"
				].join("");
			},
			get avn_alexcrafter28() {
				return [
					"联动来源：《大乱桌斗》",
					lineBreak,
					"武将作者：Show-K、mario not mary",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_alexcrafter28")}. Alexcrafter28`,
					lineBreak,
					"首次登场：Lush Caves - AVM Shorts Episode 24",
					thematicBreak,
					"1428. 史蒂夫/Steve/スティーブ",
					lineBreak,
					`系列：${annotate("我的世界", "Minecraft")}`,
					lineBreak,
					`首次登场：${annotate("我的世界", "Minecraft")}`,
					lineBreak,
					"来自一个由立方体构成的世界的神秘人物，身为一名探险家（同时还是一名矿工），他将（和他心爱的镐子）探索这个世界，并与各位斗士们进行一次武艺切磋。",
					lineBreak,
					"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》",
					thematicBreak,
					"这个世界上未曾发生过有人玩Minecraft时突然有两个火柴人从游戏窗口内钻出来到桌面，然后找到邮件程序并把火柴人自己发送出去的事情。"
				].join("");
			},
			get ska_warden() {
				return [
					"联动来源：《大乱桌斗》",
					lineBreak,
					"武将作者：Show-K",
					lineBreak,
					"插图作者：《我的世界》",
					thematicBreak,
					`AvN${getCharacterIndex("ska_warden")}. 监守者/Warden/ウォーデン`,
					lineBreak,
					"首次登场：The Warden - AVM Shorts Episode 26",
					thematicBreak,
					"S010. 监守者/Warden/ウォーデン",
					lineBreak,
					`系列：${annotate("我的世界", "Minecraft")}`,
					lineBreak,
					`首次登场：${annotate("我的世界", "Minecraft")}`,
					lineBreak,
					"监守者（Warden）是一种高大而危险的敌对生物，会根据振动和气息判断生物的位置。",
					lineBreak,
					"——《Minecraft Wiki》",
					thematicBreak,
					"没有人知道历史。"
				].join("");
			},
			get sst_mario() {
				return [
					"联动来源：《大乱桌斗》",
					lineBreak,
					"武将作者：mario not mary、Show-K",
					lineBreak,
					"插图作者：黯まめ",
					lineBreak,
					`——${formatURL("https://twitter.com/kuromame_983/status/601696186274160640")}`,
					thematicBreak,
					`AvN${getCharacterIndex("sst_mario")}. 马力欧/Mario/マリオ`,
					lineBreak,
					"首次登场：Animation vs. Super Mario Bros",
					thematicBreak,
					"0001. 马力欧/Mario/マリオ",
					lineBreak,
					`系列：${annotate("马力欧", "Mario")}`,
					lineBreak,
					`首次登场：${annotate("咚奇刚", "Donkey Kong")}`,
					lineBreak,
					"超级标志性的角色！这位游戏巨星常常从酷霸王手中拯救世界。他有惊人的跳跃能力和多种变身道具。在闲暇时刻，他还会参与体育运动，擅长的项目数也数不清。在大乱斗里，他是一个值得信赖的全能型斗士。让我们一起来说：“是我，马力欧！”",
					lineBreak,
					"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》",
					thematicBreak,
					"太激昂了，太生生不息了。"
				].join("");
			},
			get avn_euler_identity() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_euler_identity")}. Euler’s identity`,
					lineBreak,
					"首次登场：Animation vs. Math",
					thematicBreak,
					"-1。"
				].join("");
			},
			get sst_kirby() {
				return [
					"联动来源：《大乱桌斗》",
					lineBreak,
					"武将作者：mario not mary",
					lineBreak,
					"插图作者：kotori",
					lineBreak,
					`——${formatURL("https://www.pixiv.net/artworks/26818738")}`,
					thematicBreak,
					`AvN${getCharacterIndex("sst_kirby")}. 卡比/Kirby/カービィ`,
					lineBreak,
					"首次登场：Kirby - An Actual Short",
					thematicBreak,
					"0323. 卡比/Kirby/カービィ",
					lineBreak,
					`系列：${annotate("星之卡比", "Kirby")}`,
					lineBreak,
					`首次登场：${annotate("星之卡比", "Kirby’s Dream Land")}`,
					lineBreak,
					"圆圆滚滚的可爱卡比在波普之星过着平静的生活。它可以吸入物品或者生物，并且将它们吐出来或者复制能力。在大乱斗中，卡比吸入斗士之后可以复制他们的通常必杀技。它虽然很容易被击飞，但回场能力还不错。",
					lineBreak,
					"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》",
					thematicBreak,
					"樱井亲儿子，粉红恶魔，灯火之星。"
				].join("");
			},
			get avn_corn_dog_guy() {
				return [
					"武将作者：Show-K",
					lineBreak,
					"插图作者：Alan Becker",
					thematicBreak,
					`AvN${getCharacterIndex("avn_corn_dog_guy")}. Corn Dog Guy`,
					lineBreak,
					"首次登场：Corn Dog Guy - An Actual Short",
					thematicBreak,
					"又是不平静的一天。"
				].join("");
			}
		},
		characterTitle: lib.avnCharacterTitle,
		perfectPair: {
			avn_victim: ["avn_alan_becker"],
			avn_the_chosen_one: ["avn_alan_becker", "avn_victim"],
			avn_the_dark_lord: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one"],
			avn_the_second_coming: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one", "avn_the_dark_lord"],
			avn_the_second_coming_the_chosen_one_return: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one", "avn_the_dark_lord", "avn_the_second_coming"],
			avn_red: ["avn_alan_becker", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return"],
			avn_yellow: ["avn_alan_becker", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red"],
			avn_green: ["avn_alan_becker", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow"],
			avn_blue: ["avn_alan_becker", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green"],
			avn_virabot: ["avn_the_dark_lord"],
			avn_herobrine: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue"],
			avn_purple: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue", "avn_herobrine"],
			avn_dark_blue: ["avn_purple"],
			avn_pink: ["avn_purple", "avn_dark_blue"],
			avn_king_orange: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue", "avn_herobrine", "avn_purple"],
			avn_gold: ["avn_king_orange"],
			avn_butcher: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue"],
			ska_warden: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue", "avn_herobrine", "avn_purple", "avn_king_orange"],
			sst_mario: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_yellow", "avn_green", "avn_blue"],
			avn_euler_identity: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return"],
			sst_kirby: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_yellow"]
		},
		skill: {
			// Rule
			_avn_character_unlocking: {
				charlotte: true,
				ruleSkill: true,
				forced: true,
				trigger: {
					global: "phaseBefore",
					player: "enterGame"
				},
				filter: (event, player, name) => name == "enterGame" || !game.phaseNumber,
				content: (event, step, source, player) => {
					const unlockedCharacters = lib.config.avn_unlocked_characters ??= [];
					for (const [key, value] of lib.avnCharacterUnlockingMap) {
						if (key.every(unlockedCharacters.includes, unlockedCharacters)) continue;
						if (value.includes(player.name1) || value.includes(player.name2)) {
							unlockedCharacters.addArray(value);
							game.saveConfigValue("avn_unlocked_characters");
						}
						break;
					}
				}
			},
			_avn_dynamic_link: {
				charlotte: true,
				nobracket: true,
				ruleSkill: true,
				forbid: ["guozhan"],
				direct: true,
				trigger: {
					global: "phaseBefore",
					player: ["enterGame", "phaseBegin"]
				},
				filter: (event, player, name) => {
					const animationVsNonameCharacters = Object.keys(lib.characterPack.animation_vs_noname);
					if (name == "phaseBegin") return typeof player.name1 == typeof player.name2 && (animationVsNonameCharacters.includes(player.name1) || animationVsNonameCharacters.includes(player.name2));
					if (event.getParent(2)?.name == "_avn_dynamic_link") return false;
					if (name == "phaseBefore" && game.phaseNumber) return false;
					if (_status.connectMode ? lib.configOL.double_character : get.config("double_character")) return false;
					return game.hasPlayer(current => current.isEnemiesOf(player) && ["legend", "epic"].includes(game.getRarity(current.name1))) && animationVsNonameCharacters.includes(player.name1);
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const animationVsNonameCharacters = Object.keys(lib.characterPack.animation_vs_noname);
					if (event.triggername == "phaseBegin") {
						const controls = ["cancel2"];
						if (animationVsNonameCharacters.includes(player.name2)) controls.unshift(`副将（${get.translation(player.name2)}）`);
						if (animationVsNonameCharacters.includes(player.name1)) controls.unshift(`主将（${get.translation(player.name1)}）`);
						player.chooseControl(...controls, () => "cancel2").set("prompt", get.prompt(event.name)).prompt2 = `你可以变更《桌面大战》的主（${get.translation(player.name1)}）/副（${get.translation(player.name2)}）将为另一张与副（${get.translation(player.name2)}）/主（${get.translation(player.name1)}）将为珠联璧合的《桌面大战》的武将牌`;
					}
					else player.chooseBool(get.prompt(event.name), `你可以将一张与${get.translation(player.name1)}为珠联璧合的《桌面大战》的武将牌作为副将，然后将基础体力上限改为4`, () => true);
					"step 1"
					if (event.triggername == "phaseBegin") {
						if (result.control == "cancel2") return;
						player.logSkill(event.name);
						const mainOrVice = result.control[0];
						if (mainOrVice == "主") {
							const changeMain = game.createEvent("changeMain");
							changeMain.player = player;
							changeMain.skill = event.name;
							changeMain.num = !_status.connectMode && get.config("changeViceType") == "online" ? 1 : 3;
							changeMain.setContent(lib.skill[event.name].changeMain);
						}
						else if (mainOrVice == "副") {
							const changeVice = game.createEvent("changeVice");
							changeVice.player = player;
							changeVice.skill = event.name;
							changeVice.num = !_status.connectMode && get.config("changeViceType") == "online" ? 1 : 3;
							changeVice.setContent(lib.skill[event.name].changeVice);
						}
					}
					else if (result.bool) {
						player.logSkill(event.name);
						const initVice = game.createEvent("initVice");
						initVice.player = player;
						initVice.skill = event.name;
						initVice.num = !_status.connectMode && get.config("changeViceType") == "online" ? 1 : 3;
						initVice.setContent(lib.skill[event.name].initVice);
					}
				},
				initList: () => {
					const characterList = _status.connectMode ? get.charactersOL() : Object.keys(lib.character).filter(value => !lib.filter.characterDisabled(value) && !lib.filter.characterDisabled2(value));
					[...game.players, ...game.dead].forEach(value => {
						characterList.remove(value.name1);
						characterList.remove(value.name2);
					});
					_status.characterlist = characterList;
				},
				changeMain: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (!_status.characterlist) lib.skill[skill].initList();
					let name2 = player.name2;
					const sourceCharacter = get.sourceCharacter(name2);
					if (sourceCharacter != name2) {
						const sourceCharacterSkills = lib.character[sourceCharacter]?.[3];
						const playerSkills = lib.character[name2]?.[3];
						if (sourceCharacterSkills?.length == playerSkills?.length && sourceCharacterSkills?.every(value => playerSkills?.includes(value))) {
							_status.characterlist.remove(sourceCharacter);
							player.reinit(name2, sourceCharacter, false);
							_status.characterlist.add(name2);
							game.triggerEnter(player);
							game.log(player, "将副将从", `#g${name2}`, "变更为", `#g${sourceCharacter}`);
							name2 = player.name2;
						}
					}
					if (!event.num) event.num = 3;
					_status.characterlist.randomSort();
					const animationVsNonameCharacters = new Set(Object.keys(lib.characterPack.animation_vs_noname)), toChanges = _status.characterlist.filter(value => {
						if (!animationVsNonameCharacters.has(value)) return false;
						const sourceCharacter = get.sourceCharacter(value);
						if (sourceCharacter != value && sourceCharacter != name2) return false;
						if (!lib.perfectPair[name2]?.includes(value) && !lib.perfectPair[value]?.includes(name2)) return false;
						const toChangeSkills = lib.character[value]?.[3];
						if (!toChangeSkills) return false;
						const playerSkills = lib.character[name2]?.[3];
						if (!playerSkills) return false;
						return toChangeSkills.length != playerSkills.length || toChangeSkills.some(skill => !playerSkills.includes(skill));
					}).slice(0, event.num);
					if (!toChanges.length) event.finish();
					else if (toChanges.length < 2) event._result = {
						bool: true,
						links: toChanges
					};
					else player.chooseButton(true, [`${get.skillTranslation(skill, player)}：选择要变更的主将（${get.translation(player.name1)}）`, [toChanges, "character"]], () => Math.random());
					"step 1"
					if (result.links) {
						event.toChange = result.links[0];
						event.trigger("removeCharacterBefore");
					}
					else event.finish();
					"step 2"
					const name1 = player.name1, toChange = event.toChange;
					game.log(player, "将主将从", `#g${name1}`, "变更为", `#g${toChange}`);
					_status.characterlist.remove(toChange);
					player.reinit(name1, toChange, false);
					_status.characterlist.add(name1);
					game.triggerEnter(player);
				},
				changeVice: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (!_status.characterlist) lib.skill[skill].initList();
					let name1 = player.name1;
					const sourceCharacter = get.sourceCharacter(name1);
					if (sourceCharacter != name1) {
						const sourceCharacterSkills = lib.character[sourceCharacter]?.[3];
						const playerSkills = lib.character[name1]?.[3];
						if (sourceCharacterSkills?.length == playerSkills?.length && sourceCharacterSkills?.every(value => playerSkills?.includes(value))) {
							_status.characterlist.remove(sourceCharacter);
							player.reinit(name1, sourceCharacter, false);
							_status.characterlist.add(name1);
							game.triggerEnter(player);
							game.log(player, "将主将从", `#g${name1}`, "变更为", `#g${sourceCharacter}`);
							name1 = player.name1;
						}
					}
					if (!event.num) event.num = 3;
					_status.characterlist.randomSort();
					const animationVsNonameCharacters = new Set(Object.keys(lib.characterPack.animation_vs_noname)), toChanges = _status.characterlist.filter(value => {
						if (!animationVsNonameCharacters.has(value)) return false;
						const sourceCharacter = get.sourceCharacter(value);
						if (sourceCharacter != value && sourceCharacter != name1) return false;
						if (!lib.perfectPair[name1]?.includes(value) && !lib.perfectPair[value]?.includes(name1)) return false;
						const toChangeSkills = lib.character[value]?.[3];
						if (!toChangeSkills) return false;
						const playerSkills = lib.character[name1]?.[3];
						if (!playerSkills) return false;
						return toChangeSkills.length != playerSkills.length || toChangeSkills.some(skill => !playerSkills.includes(skill));
					}).slice(0, event.num);
					if (!toChanges.length) event.finish();
					else if (toChanges.length < 2) event._result = {
						bool: true,
						links: toChanges
					};
					else player.chooseButton(true, [`${get.skillTranslation(skill, player)}：选择要变更的副将（${get.translation(player.name2)}）`, [toChanges, "character"]], () => Math.random());
					"step 1"
					if (result.links) {
						event.toChange = result.links[0];
						event.trigger("removeCharacterBefore");
					}
					else event.finish();
					"step 2"
					const name2 = player.name2;
					game.log(player, "将副将从", `#g${name2}`, "变更为", `#g${event.toChange}`);
					_status.characterlist.remove(event.toChange);
					player.reinit(name2, event.toChange, false);
					_status.characterlist.add(name2);
					game.triggerEnter(player);
				},
				initVice: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (!_status.characterlist) lib.skill[skill].initList();
					let name1 = player.name1;
					const sourceCharacter = get.sourceCharacter(name1);
					if (sourceCharacter != name1) {
						const sourceCharacterSkills = lib.character[sourceCharacter]?.[3];
						const playerSkills = lib.character[name1]?.[3];
						if (sourceCharacterSkills?.length == playerSkills?.length && sourceCharacterSkills?.every(value => playerSkills?.includes(value))) {
							_status.characterlist.remove(sourceCharacter);
							player.reinit(name1, sourceCharacter, false);
							_status.characterlist.add(name1);
							game.triggerEnter(player);
							game.log(player, "将主将从", `#g${name1}`, "变更为", `#g${sourceCharacter}`);
							name1 = player.name1;
						}
					}
					if (!event.num) event.num = 3;
					_status.characterlist.randomSort();
					const animationVsNonameCharacters = new Set(Object.keys(lib.characterPack.animation_vs_noname)), toChanges = _status.characterlist.filter(value => {
						if (!animationVsNonameCharacters.has(value)) return false;
						const sourceCharacter = get.sourceCharacter(value);
						if (sourceCharacter != value && sourceCharacter != name1) return false;
						if (!lib.perfectPair[name1]?.includes(value) && !lib.perfectPair[value]?.includes(name1)) return false;
						const toChangeSkills = lib.character[value]?.[3];
						if (!toChangeSkills) return false;
						const playerSkills = lib.character[name1]?.[3];
						if (!playerSkills) return false;
						return toChangeSkills.length != playerSkills.length || toChangeSkills.some(skill => !playerSkills.includes(skill));
					}).slice(0, event.num);
					if (!toChanges.length) event.finish();
					else if (toChanges.length < 2) event._result = {
						bool: true,
						links: toChanges
					};
					else player.chooseButton(true, [`${get.skillTranslation(skill, player)}：选择要作为副将的武将牌`, [toChanges, "character"]], () => Math.random());
					"step 1"
					if (result.links) {
						const toChange = result.links[0];
						game.log(player, "将", `#g${toChange}`, "作为了副将");
						_status.characterlist.remove(toChange);
						const group = player.group, hp = player.hp, maxHp = 4 + player.maxHp - get.infoMaxHp(lib.character[player.name1]?.[2]);
						player.init(player.name1, toChange);
						player.changeGroup(group, false);
						player.hp = hp;
						player.maxHp = maxHp;
						player.update();
						game.triggerEnter(player);
					}
				}
			},
			// Alan Becker
			avn_animate: {
				delay: false,
				enable: "phaseUse",
				usable: 1,
				filter: (event, player) => player.hasCard(lib.skill.avn_animate.filterCard, lib.skill.avn_animate.position),
				position: "h",
				filterCard: card => ["basic", "trick"].includes(get.type(card)),
				filterTarget: true,
				discard: false,
				lose: false,
				check: card => {
					const handCardValues = _status.event.player.getCards("h").map(value => get.value(value));
					return Math.abs(get.value(card) - handCardValues.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / handCardValues.length);
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.showCards(event.card = cards[0], `${get.translation(player)}对${(targets => {
						if (get.itemtype(targets) == "player") targets = [targets];
						if (targets[0] != player) return get.translation(targets);
						const targetsIncludingSelf = targets.slice();
						targetsIncludingSelf[0] = "自己";
						return get.translation(targetsIncludingSelf);
					})(target)}发动了【${get.skillTranslation(event.name, player)}】`);
					"step 1"
					player.choosePlayerCard(target, "h", [1, Infinity], `${get.skillTranslation(event.name, player)}：令${get.translation(target)}的任意张手牌均视为${get.translation({
						name: get.name(card),
						nature: get.nature(card)
					})}，直到其使用这些牌中的一张结算或其回合结束后`, button => _status.event.player.attitudeTo(_status.event.getParent().target) > 0 ? 5 - get.buttonValue(button) : get.buttonValue(button));
					"step 2"
					if (!result.cards?.length) return;
					const effectSkillName = `${event.name}_effect`;
					target.addGaintag(result.cards, effectSkillName);
					const name = get.name(card), nature = get.nature(card);
					target.popup(name, nature);
					target.addTempSkill(effectSkillName, {
						player: "phaseAfter"
					});
					target.storage[effectSkillName].add({
						name: name,
						nature: nature
					});
					game.delayx();
				},
				ai: {
					order: 10,
					result: {
						target: (player, target) => {
							if (!ui.selected.cards.length) return 0;
							const cardValue = get.value(ui.selected.cards[0]), handCardValues = player.getCards("h").map(value => get.value(value)), averageHandCardValue = handCardValues.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / handCardValues.length;
							if (cardValue < averageHandCardValue) return -target.countCards("h");
							if (cardValue > averageHandCardValue) return target.countCards("h");
						}
					}
				}
			},
			avn_animate_effect: {
				charlotte: true,
				init: (player, skill) => {
					if (!Array.isArray(player.storage[skill])) player.storage[skill] = [];
				},
				onremove: (player, skill) => {
					player.removeGaintag(skill);
					delete player.storage[skill];
				},
				mark: true,
				intro: {
					content: (storage, player) => {
						const affectedHandCards = player.getCards("h", card => card.hasGaintag("avn_animate_effect"));
						if (!affectedHandCards.length) return `无效果`;
						if (player.isUnderControl(true)) return `${get.translation(affectedHandCards)}${affectedHandCards.length > 1 ? "均" : ""}视为${get.translation(storage[storage.length - 1])}，直到你使用这些牌中的一张结算后或你的回合结束后`;
						return `有${get.cnNumber(affectedHandCards.length)}张手牌${affectedHandCards.length > 1 ? "均" : ""}视为${get.translation(storage[storage.length - 1])}，直到你使用这些牌中的一张结算后或你的回合结束后`;
					},
					markcount: (storage, player) => player.countCards("h", card => card.hasGaintag("avn_animate_effect"))
				},
				mod: {
					cardname: (card, player) => {
						if (card.hasGaintag("avn_animate_effect")) {
							const storage = player.getStorage("avn_animate_effect");
							return storage[storage.length - 1].name;
						}
					},
					cardnature: (card, player) => {
						if (card.hasGaintag("avn_animate_effect")) {
							const storage = player.getStorage("avn_animate_effect");
							return storage[storage.length - 1].nature;
						}
					}
				},
				forced: true,
				popup: false,
				trigger: {
					player: "useCardAfter"
				},
				filter: (event, player) => player.hasHistory("lose", evt => evt.getParent() == event && Object.values(evt.gaintag_map).some(value => value.includes("avn_animate_effect"))),
				content: (event, step, source, player) => {
					player.removeSkill(event.name);
				},
				ai: {
					nokeep: true
				}
			},
			// Victim
			avn_adaptive: {
				hiddenCard: (player, name) => player.hasCard(card => ["basic", "trick"].includes(get.type(card)) && get.name(card) == name, "h"),
				locked: false,
				enable: "chooseToUse",
				filter: (event, player) => !player.hasHistory("useSkill", evt => evt.skill == "avn_adaptive") && player.hasCard(card => ["basic", "trick"].includes(get.type(card)) && event.filterCard({
					name: get.name(card),
					nature: get.nature(card)
				}, player, event), "h"),
				chooseButton: {
					dialog: (event, player) => ui.create.dialog(get.skillTranslation("avn_adaptive", player), player.getCards("h")),
					filter: (button, player) => {
						const link = button.link;
						if (!["basic", "trick"].includes(get.type(link))) return false;
						const parent = _status.event.getParent();
						return parent.filterCard({
							name: get.name(link),
							nature: get.nature(link)
						}, player, parent);
					},
					check: button => {
						if (_status.event.getParent().type != "phase") return 1;
						const link = button.link, name = get.name(link);
						if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(name)) return 0;
						return _status.event.player.getUseValue({
							name: name,
							nature: get.nature(link)
						});
					},
					backup: links => {
						const link = links[0];
						return {
							audio: false,
							popname: true,
							filterCard: true,
							position: "hes",
							viewAs: {
								name: get.name(link),
								nature: get.nature(link),
								storage: {
									avn_adaptive: true
								}
							},
							ai1: card => 8 - get.value(card),
							shownCard: link,
							onuse: (result, player) => {
								const skill = result.skill.slice(0, -7), targets = result.targets;
								player.logSkill(skill, targets);
								player.showCards(lib.skill.avn_adaptive_backup.shownCard, `${get.translation(player)}对${(targets => {
									if (get.itemtype(targets) == "player") targets = [targets];
									if (targets[0] != player) return get.translation(targets);
									const targetsIncludingSelf = targets.slice();
									targetsIncludingSelf[0] = "自己";
									return get.translation(targetsIncludingSelf);
								})(targets)}发动了【${get.skillTranslation(skill, player)}】`);
								const event = _status.event;
								event.addCount = false;
								event.oncard = () => {
									const event = _status.event;
									if (!Array.isArray(event.temporaryYingbian)) event.temporaryYingbian = [];
									const temporaryYingbian = event.temporaryYingbian;
									temporaryYingbian.addArray(get.yingbianConditions());
									temporaryYingbian.add("draw");
									temporaryYingbian.add("gain");
								};
							}
						}
					},
					prompt: links => {
						const link = links[0];
						return `将一张牌当做${get.translation({
							name: get.name(link),
							nature: get.nature(link)
						})}使用或打出`;
					}
				},
				mod: {
					targetInRange: card => {
						if (card.storage?.avn_adaptive) return true;
					},
					cardUsable: card => {
						if (card.storage?.avn_adaptive) return Infinity;
					}
				},
				ai: {
					fireAttack: true,
					respondSha: true,
					respondShan: true,
					respondTao: true,
					save: true,
					skillTagFilter: (player, tag) => {
						if (player.hasHistory("useSkill", evt => evt.skill == "avn_adaptive")) return false;
						switch (tag) {
							case "fireAttack":
								if (!player.hasCard(card => get.name(card) == "huogong")) return false;
								break;
							case "respondSha":
								if (!player.hasCard(card => get.name(card) == "sha")) return false;
								break;
							case "respondShan":
								if (!player.hasCard(card => get.name(card) == "shan")) return false;
								break;
							case "respondTao":
								if (!player.hasCard(card => get.name(card) == "tao")) return false;
								break;
							case "save": if (!player.hasCard(card => get.tag(card, "save"))) return false;
						}
					},
					order: 10,
					result: {
						player: player => {
							const dying = _status.event.dying;
							return dying ? player.attitudeTo(dying) : 1;
						}
					}
				}
			},
			// The Chosen One
			avn_overflow: {
				direct: true,
				trigger: {
					player: "phaseUseBegin"
				},
				filter: (event, player) => player.hasCard(card => lib.filter.cardDiscardable(card, player)),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseCardTarget({
						position: "h",
						filterCard: (card, player) => lib.filter.cardDiscardable(card, player) && (!ui.selected.cards.length || get.suit(card) == get.suit(ui.selected.cards[0])),
						selectCard: () => ui.selected.cards.length ? _status.event.player.countCards("h", card => lib.filter.cardDiscardable(card, _status.event.player) && get.suit(card) == get.suit(ui.selected.cards[0])) : [1, Infinity],
						filterTarget: true,
						ai1: card => 8 - get.useful(card) - _status.event.player.countCards("h", value => get.suit(value) == get.suit(card)) ** 2,
						ai2: target => {
							const controls = lib.linked.slice();
							controls.remove("kami");
							controls.push("cancel2");
							const player = _status.event.player;
							return Math.max(...controls.map(value => get.damageEffect(target, player, player, value)));
						},
						prompt: get.prompt(event.name),
						prompt2: get.skillInfoTranslation(event.name, player)
					});
					"step 1"
					if (result.cards?.length && result.targets?.length) {
						event.cards = result.cards;
						const target = event.target = result.targets[0];
						player.logSkill(event.name, target);
						if (target != player) player.addExpose(0.2);
						player.showHandcards(`${get.translation(player)}对${(targets => {
							if (get.itemtype(targets) == "player") targets = [targets];
							if (targets[0] != player) return get.translation(targets);
							const targetsIncludingSelf = targets.slice();
							targetsIncludingSelf[0] = "自己";
							return get.translation(targetsIncludingSelf);
						})(target)}发动了【${get.skillTranslation(event.name, player)}】`);
					}
					else event.finish();
					"step 2"
					player.discard(cards.filter(value => lib.filter.cardDiscardable(value, player)));
					"step 3"
					const controls = lib.linked.filter(value => value != "kami");
					player.chooseControl(...controls, (event, player) => {
						const choices = _status.event.controls.map(value => get.damageEffect(_status.event.getParent().target, player, player, value)), max = Math.max(...choices);
						return choices.reduce((previousValue, currentValue, currentIndex) => {
							if (currentValue == max) previousValue.push(currentIndex);
							return previousValue;
						}, []).randomGet();
					}).prompt = `${get.skillTranslation(event.name, player)}：对${get.translation(target)}造成1点属性伤害`;
					"step 4"
					if (!result.control) return;
					player.line(target, result.control);
					target.damage(result.control, "nocard");
					game.delayex();
					"step 5"
					const giftableCards = event.giftableCards = cards.filterInD("d").filter(value => game.hasPlayer(current => current != player && current.countCards("h") <= player.countCards("h") && player.canGift(value, current)));
					if (giftableCards.length) player.chooseTarget(`${get.skillTranslation(event.name, player)}：你可以将${get.translation(giftableCards)}${giftableCards.length > 1 ? "中的一张" : ""}赠予一名手牌数不大于你的其他角色`, (card, player, target) => target != player && target.countCards("h") <= player.countCards("h") && _status.event.getParent().cards.filterInD("d").some(value => player.canGift(value, target)),
						target => {
							const player = _status.event.player;
							return Math.max(..._status.event.getParent().cards.filterInD("d").filter(value => player.canGift(value, target)).map(value => player.getGiftEffect(value, target)));
						});
					else event.finish();
					"step 6"
					if (result.targets?.length) {
						const giftingTarget = event.giftingTarget = result.targets[0];
						player.line(giftingTarget, "green");
						const giftableCardsToGiftingTarget = event.giftableCards.filter(value => player.canGift(value, giftingTarget));
						if (giftableCardsToGiftingTarget.length < 2) event._result = {
							bool: true,
							links: giftableCardsToGiftingTarget
						};
						else {
							const chooseCardButton = player.chooseCardButton(`${get.skillTranslation(event.name, player)}：将${get.translation(giftableCardsToGiftingTarget)}${giftableCardsToGiftingTarget.length > 1 ? "中的一张" : ""}赠予${get.translation(giftingTarget)}`, true, giftableCardsToGiftingTarget);
							chooseCardButton.target = giftingTarget;
							chooseCardButton.ai = button => _status.event.player.getGiftEffect(button.link, _status.event.target);
						}
					}
					else event.finish();
					"step 7"
					if (!result.links?.length) return;
					player.gift(result.links, event.giftingTarget);
					player.addExpose(0.2);
				},
				ai: {
					damage: true
				}
			},
			// The Dark Lord
			avn_terminal: {
				direct: true,
				trigger: {
					player: "phaseUseEnd"
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseTarget(get.prompt2(event.name)).ai = target => {
						const attitude = _status.event.player.attitudeTo(target);
						return (attitude < 0 ? -Math.sqrt(-attitude) : Math.sqrt(attitude)) * (() => {
							if (target.countCards("h") == 0 || target.hasSkillTag("noh")) return 0;
							if (attitude <= 0 && !target.countCards("h")) return 1.5;
							return -1.5;
						})();
					};
					"step 1"
					if (result.targets?.length) {
						const target = event.target = result.targets[0];
						player.logSkill(event.name, target);
						player.showCards(target.getCards("h"), `${get.translation(player)}对${(targets => {
							if (get.itemtype(targets) == "player") targets = [targets];
							if (targets[0] != player) return get.translation(targets);
							const targetsIncludingSelf = targets.slice();
							targetsIncludingSelf[0] = "自己";
							return get.translation(targetsIncludingSelf);
						})(target)}发动了【${get.skillTranslation(event.name, player)}】`);
						if (target != player) player.addExpose(0.2);
					}
					else event.finish();
					"step 2"
					if (target.countCards("h")) player.choosePlayerCard(`${get.skillTranslation(event.name, player)}：你可以删除${get.translation(target)}的手牌中的一种花色的所有牌`, target, "h", "visible", button => {
						const player = _status.event.player, target = _status.event.getParent().target, buttonValue = get.buttonValue(button) + target.countDiscardableCards(player, "h", card => get.suit(card) == get.suit(button.link)) ** 2 - 1;
						if (player.attitudeTo(target) > 0) return -buttonValue;
						return buttonValue;
					}, button => !ui.selected.buttons.length || get.suit(button.link) == get.suit(ui.selected.buttons[0].link)).set("selectButton", () => ui.selected.buttons.length ? _status.event.getParent().target.countDiscardableCards(_status.event.player, "h", card => get.suit(card) == get.suit(ui.selected.buttons[0].link)) : [1, Infinity]).complexSelect = true;
					else event.finish();
					"step 3"
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
					if (target != player) player.addExpose(0.2);
				}
			},
			// The Second Coming
			avn_frame_by_frame_drawing: {
				hiddenCard: (player, name) => Array.from(ui.discardPile.childNodes).slice(-5).some(value => {
					if (lib.skill.avn_frame_by_frame_drawing.isNotValidConversionResult(player, value)) return false;
					return get.name(value) == name;
				}),
				enable: ["chooseToUse", "chooseToRespond"],
				filter: (event, player) => Array.from(ui.discardPile.childNodes).slice(-5).some(value => !lib.skill.avn_frame_by_frame_drawing.isNotValidConversionResult(player, value) && event.filterCard({
					name: get.name(value),
					nature: get.nature(value)
				}, player, event)),
				chooseButton: {
					dialog: (event, player) => ui.create.dialog(get.skillTranslation("avn_frame_by_frame_drawing", player), Array.from(ui.discardPile.childNodes).slice(-5)),
					filter: (button, player) => {
						if (lib.skill.avn_frame_by_frame_drawing.isNotValidConversionResult(player, button.link)) return false;
						const parent = _status.event.getParent();
						return parent.filterCard({
							name: get.name(button.link),
							nature: get.nature(button.link)
						}, player, parent);
					},
					check: button => {
						if (_status.event.getParent().type != "phase") return 1;
						const link = button.link;
						if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(get.name(link))) return 0;
						return _status.event.player.getUseValue({
							name: get.name(link),
							nature: get.nature(link)
						});
					},
					backup: links => {
						const link = links[0];
						return {
							audio: false,
							popname: true,
							selectedCard: link,
							position: "hes",
							filterCard: (card, player) => lib.skill.avn_frame_by_frame_drawing.isConvertable(player, card, lib.skill.avn_frame_by_frame_drawing_backup.selectedCard),
							viewAs: {
								name: get.name(link),
								nature: get.nature(link)
							},
							ai1: card => (8 - get.value(card)) / get.number(card)
						};
					},
					prompt: links => {
						const link = links[0];
						return `将一张牌当做${get.translation({
							name: get.name(link),
							nature: get.nature(link)
						})}使用或打出`;
					}
				},
				isSuitAndTypeAndLengthDifferentFrom: (card, anotherCard) => get.suit(card) != get.suit(anotherCard) && get.type2(card) != get.type2(anotherCard) && get.cardNameLength(card) != get.cardNameLength(anotherCard),
				isNumberNotLessThanPreviousConvertedCard: (player, card) => !(get.number(card) < player.getHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup").pop()?.event.card.number),
				isConvertable: (player, card, conversionResult) => lib.skill.avn_frame_by_frame_drawing.isSuitAndTypeAndLengthDifferentFrom(card, conversionResult) && lib.skill.avn_frame_by_frame_drawing.isNumberNotLessThanPreviousConvertedCard(player, card),
				isNotValidConversionResult: (player, card) => !["basic", "trick"].includes(get.type(card)) || !player.hasCard(cardx => lib.skill.avn_frame_by_frame_drawing.isConvertable(player, cardx, card), "hes"),
				ai: {
					fireAttack: true,
					respondSha: true,
					respondShan: true,
					respondTao: true,
					save: true,
					skillTagFilter: (player, tag) => {
						if (Array.from(ui.discardPile.childNodes).slice(-5).every(value => {
							if (lib.skill.avn_frame_by_frame_drawing.isNotValidConversionResult(player, value)) return true;
							switch (tag) {
								case "fireAttack": return get.name(value) != "huogong";
								case "respondSha": return get.name(value) != "sha";
								case "respondShan": return get.name(value) != "shan";
								case "respondTao": return get.name(value) != "tao";
								case "save": return !get.tag(value, "save");
							}
							return false;
						})) return false;
					},
					order: 10,
					result: {
						player: player => {
							const dying = _status.event.dying;
							return dying ? player.attitudeTo(dying) : 1;
						}
					}
				}
			},
			_avn_awaking_check: {
				ruleSkill: true,
				forced: true,
				trigger: {
					player: "changeHp"
				},
				filter: (event, player) => {
					if (lib.config.avn_unlocked_characters?.includes("avn_the_second_coming_the_chosen_one_return")) return false;
					if (player.storage.avn_awaking) return false;
					if (event.num > 0) return false;
					if (![player.name1, player.name2].includes("avn_the_second_coming")) return false;
					const friends = game.filterPlayer2(current => current.isFriendsOf(player) || player.isFriendsOf(current)), inGameFriends = friends.filter(friend => friend.isIn());
					return inGameFriends.length < friends.length && inGameFriends.every(friend => [friend.name1, friend.name2].includes("avn_the_second_coming"));
				},
				content: (event, step, source, player) => {
					if (!player.storage.avn_pre_awaking) {
						player.storage.avn_pre_awaking = true;
						game.broadcastAll(() => {
							const preAwaking = ui.create.div("#avn-pre-awaking", document.body);
							new Promise(resolve => setTimeout(resolve, 1000)).then(() => preAwaking.style.opacity = "0.5");
						});
					}
					if (player.hp <= 0) player.addSkill("avn_awaking");
				}
			},
			avn_awaking: {
				charlotte: true,
				init: (player, skill) => {
					if (player.storage[skill]) return;
					player.storage[skill] = 1;
					game.addGlobalSkill("avn_awaking_effect");
					game.broadcastAll(broadcastingPlayer => {
						broadcastingPlayer.nodying = true;
						ui.window.addEventListener("animationend", animationEvent => {
							if (animationEvent.animationName == "avn-pulse" || animationEvent.animationName == "avn-strong-pulse") ui.window.classList.remove(animationEvent.animationName);
						});
						(game.download ? Promise.resolve(
							`${lib.assetURL}extension/桌面大战/image/background/avn_the_second_coming_the_chosen_one_return_bg.webp`
						) : game.getDB(
							"image",
							"extension-桌面大战:image/background/avn_the_second_coming_the_chosen_one_return_bg.webp"
						)).then(value => new Image().src = value);
					}, player);
				},
				forced: true,
				trigger: {
					global: "phaseZhunbeiBegin"
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					"step 0"
					if (player.storage[event.name] > 1 || trigger.player != player || ![player.name1, player.name2].includes("avn_the_second_coming")) {
						if (player.hp < player.maxHp) player.draw()._triggered = player.recover()._triggered = null;
						event.finish();
						return;
					}
					game.broadcastAll(broadcastingPlayer => {
						const preAwaking = document.getElementById("avn-pre-awaking"), awake = () => {
							_status._aozhan = true;
							if (game.download) {
								_status.tempAozhan = "ext:桌面大战/audio/background/music_arrival.opus";
								_status.tempBackground = "ext:桌面大战/image/background/avn_the_second_coming_the_chosen_one_return_bg.webp";
							}
							else {
								_status.tempAozhan = "extension-桌面大战:audio/background/music_arrival.opus";
								_status.tempBackground = "extension-桌面大战:image/background/avn_the_second_coming_the_chosen_one_return_bg.webp";
							}
							game.playBackgroundMusic();
							game.updateBackground();
						};
						if (preAwaking) {
							const style = preAwaking.style;
							style.transitionDuration = "1s";
							style.boxShadow = "inset 0 0 200px 400px #d8eec2";
							style.opacity = "1";
							new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
								awake();
								style.boxShadow = "inset 0 0 200px 200px #d8eec2";
								style.opacity = "0";
							});
						}
						else new Promise(resolve => setTimeout(resolve, 1000)).then(awake);
						broadcastingPlayer?.showIdentity();
					}, player);
					player.storage[event.name] = 2;
					player.reinit("avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", false);
					game.triggerEnter(player);
					"step 1"
					const damagedHp = player.maxHp - player.hp;
					if (damagedHp > 0) player.draw(damagedHp)._triggered = player.recover(damagedHp)._triggered = null;
					game.broadcastAll(broadcastedPlayer => delete broadcastedPlayer.nodying, player);
					lib.onover.push(resultbool => {
						if (resultbool) game.filterPlayer2(current => current.isUnderControl(true) && [current.name1, current.name2].includes("avn_the_second_coming_the_chosen_one_return")).forEach(theSecondComing => game.filterPlayer2(current => {
							(lib.config.avn_unlocked_characters ??= []).add("avn_the_second_coming_the_chosen_one_return");
							game.saveConfigValue("avn_unlocked_characters");
							if (current.isIn() || !current.isFriendsOf(theSecondComing) && !theSecondComing.isFriendsOf(current)) return;
							theSecondComing.line(current, "green");
							game.broadcastAll(broadcastedCurrent => {
								broadcastedCurrent.in();
								if (broadcastedCurrent.isDead()) broadcastedCurrent.revive(broadcastedCurrent.maxHp);
							}, current);
						}));
					});
				}
			},
			avn_awaking_effect: {
				ruleSkill: true,
				forced: true,
				trigger: {
					global: "changeHp"
				},
				filter: event => {
					const parent = event.getParent(), {
						name,
						player,
					} = parent;
					switch (name) {
						case "damage": return player.storage.avn_awaking || parent.source?.storage.avn_awaking;
						case "loseHp": return player.storage.avn_awaking || parent.getParent()?.player.storage.avn_awaking;
					}
					return false;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					if (trigger.num < -1) game.broadcastAll(() => ui.window.classList.add("avn-strong-pulse"));
					else game.broadcastAll(() => ui.window.classList.add("avn-pulse"));
				}
			},
			// The Second Coming (The Chosen One’s Return)
			avn_awakening: {
				delay: false,
				enable: "phaseUse",
				usable: 1,
				filterTarget: true,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.showCards(target.getCards("h"), `${get.translation(player)}对${(targets => {
						if (get.itemtype(targets) == "player") targets = [targets];
						if (targets[0] != player) return get.translation(targets);
						const targetsIncludingSelf = targets.slice();
						targetsIncludingSelf[0] = "自己";
						return get.translation(targetsIncludingSelf);
					})(target)}发动了【${get.skillTranslation(event.name, player)}】`);
					"step 1"
					const controls = ["选项二", "cancel2"], targetTranslation = get.translation(target), choiceList = [`令${targetTranslation}失去${event.num = Math.abs(target.countCards("h", {
						color: "red"
					}) - target.countCards("h", {
						color: "black"
					}))}点体力`];
					if (target.hp < target.maxHp) {
						controls.unshift("选项一");
						choiceList.unshift(`令${targetTranslation}回复${event.num}点体力`);
					}
					else {
						const span = document.createElement("span");
						span.style.opacity = "0.5";
						span.textContent = "此选项不可用";
						choiceList.unshift(span.outerHTML);
					}
					player.chooseControl(...controls, (event, player) => _status.event.controls.map(control => {
						if (control == "选项一") return {
							control,
							effect: event.getParent().target.countCards("h") * get.recoverEffect(event.target, player, player)
						};
						if (control == "选项二") return {
							control,
							effect: event.getParent().target.countCards("h") * get.effect(event.target, {
								name: "losehp"
							}, player, player)
						};
						return {
							control,
							effect: 0
						};
					}).sort((a, b) => a.effect - b.effect).pop().control).set("choiceList", choiceList).prompt = `${get.skillTranslation(event.name, player)}：你可以选择一项`;
					"step 2"
					switch (result.control) {
						case "选项一":
							if (target.hp < target.maxHp) {
								target.recover(num);
								game.delayex();
							}
							break;
						case "选项二":
							target.loseHp(num);
							game.delayex();
					}
				},
				ai: {
					order: 10,
					result: {
						target: (player, target) => get.sgnAttitude(player, target)
					}
				}
			},
			// Red
			avn_combative: {
				intro: {
					content: "expansion",
					markcount: "expansion"
				},
				onremove: (player, skill) => {
					const cards = player.getExpansions(skill);
					if (cards.length) player.loseToDiscardpile(cards);
				},
				direct: true,
				trigger: {
					global: ["eventNeutralized", "shaMiss"],
					source: "damageSource"
				},
				filter: (event, player, name) => name == "damageSource" ? player.hasCard(card => game.hasPlayer(current => lib.filter.canBeGained(card, current, player)), "x") : !player.hasSkillTag("noCompareSource") && game.hasPlayer(current => current != player && current.countCards("h") && !current.hasSkillTag("noCompareTarget")),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (event.triggername == "damageSource") player.chooseTarget(get.prompt(event.name), `你可以将武将牌上的任意张牌交给一名角色`, (card, player, target) => player.hasCard(card => lib.filter.canBeGained(card, target, player), "x"), target => {
						const player = _status.event.player, attitude = player.attitudeTo(target);
						if (!attitude) return 0;
						const expansionCardValues = player.getCards("x", card => lib.filter.canBeGained(card, target, player)).map(value => get.value(value, target));
						return attitude > 0 ? Math.max(...expansionCardValues) : -Math.min(...expansionCardValues);
					});
					else if (!player.hasSkillTag("noCompareSource")) player.chooseTarget(get.prompt(event.name), "你可以使用牌堆顶的一张牌与一名角色拼点，若你赢，则你可以使用一张拼点牌，否则你将你的区域内的一张牌置于武将牌上", (card, player, target) => target != player && target.countCards("h") && !target.hasSkillTag("noCompareTarget"), target => _status.event.player.attitudeTo(target) <= 0 && Math.random() - 0.4);
					else event.finish();
					"step 1"
					if (result.targets?.length) {
						const target = event.target = result.targets[0];
						if (event.triggername == "damageSource") {
							player.logSkill(event.name, target);
							const chooseCardButton = player.chooseCardButton(`${get.skillTranslation(event.name, player)}：将任意张牌交给${get.translation(target)}`, true, [1, Infinity], player.getCards("x", card => lib.filter.canBeGained(card, target, player)));
							chooseCardButton.filterButton = (button, player) => lib.filter.canBeGained(button.link, _status.event.getParent().target, player);
							chooseCardButton.ai = button => {
								const target = _status.event.getParent().target;
								return _status.event.player.attitudeTo(target) * get.value(button.link, target);
							};
						}
						else {
							player.logSkill(event.name, target);
							player.addExpose(0.2);
							const chooseToCompare = player.chooseToCompare(target);
							if (!chooseToCompare.fixedResult) chooseToCompare.fixedResult = {};
							const cards = get.cards();
							game.cardsGotoOrdering(cards).relatedEvent = chooseToCompare;
							chooseToCompare.fixedResult[player.playerid] = cards[0];
						}
					}
					else event.finish();
					"step 2"
					if (event.triggername == "damageSource") {
						player.give(result.links, target, true);
						if (target != player) player.addExpose(0.2);
						event.finish();
					}
					else if (event.won = result.bool) {
						event.cards = game.getGlobalHistory("cardMove", evt => evt.getParent(2) == event).reduce((previousValue, currentValue) => previousValue.addArray(currentValue.cards.filterInD("d")), []);
						event.chosenCards = [];
					}
					else if (player.countCards("hej")) player.choosePlayerCard(player, "hej", `${get.skillTranslation(event.name, player)}：将你的区域内的一张牌置于武将牌上`, true);
					else event.finish();
					"step 3"
					if (event.won) player.chooseCardButton(`${get.skillTranslation(event.name, player)}：你可以使用${get.translation(cards)}${cards.length > 1 ? "中的一张牌" : ""}`, cards).set("filterButton", button => _status.event.player.hasUseTarget(button.link)).ai = button => !_status.event.getParent().chosenCards.includes(button.link) && _status.event.player.getUseValue(button.link);
					else {
						if (result.cards?.length) player.addToExpansion(result.cards, player, "give").gaintag.add(event.name);
						event.finish();
					}
					"step 4"
					if (result.links?.length) event.chooseUseTarget = player.chooseUseTarget(event.chosenCards.addArray(result.links)[0], false);
					else event.finish();
					"step 5"
					if (!player.hasHistory("useCard", evt => evt.getParent() == event.chooseUseTarget)) event.goto(3);
				}
			},
			// Yellow
			avn_intelligence: {
				direct: true,
				trigger: {
					global: "phaseEnd"
				},
				filter: (event, player) => typeof event.skill != "string" && Math.log2(player.getHistory("useCard", evt => typeof evt.card.name == "string").reduce((previousValue, currentValue) => previousValue + get.translation(currentValue.card.name).length, 0)) % 1 === 0,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseTarget(get.prompt2(event.name)).ai = target => {
						if (target.hasJudge("lebu")) return -1;
						if (player.attitudeTo(target) > 4) return get.threaten(target) / Math.sqrt(target.hp + 1) / Math.sqrt(target.countCards("h") + 1);
						return -1;
					};
					"step 1"
					if (!result.targets?.length) return;
					player.logSkill(event.name, event.target = result.targets[0]);
					if (event.target != player) player.addExpose(0.2);
					event.target.insertPhase();
				}
			},
			// Green
			avn_progressive: {
				locked: false,
				mod: {
					aiOrder: (player, card, num) => {
						const suit = get.suit(card);
						if (!player.getHistory("useCard").map(value => value.card.suit).removeArray(player.getHistory("useSkill", evt => evt.skill == "avn_progressive" && evt.event.discardedCardSuit).map(value => value.event.discardedCardSuit)).filter(value => value = suit).length) return num + 10;
					}
				},
				direct: true,
				trigger: {
					player: "useCard"
				},
				filter: (event, player) => player.getHistory("useCard").map(value => value.card.suit).removeArray(player.getHistory("useSkill", evt => evt.skill == "avn_progressive" && evt.event.discardedCardSuit).map(value => value.event.discardedCardSuit)).filter(value => value == event.card.suit).length < 2,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseTarget(get.prompt2(event.name)).ai = target => {
						let effect = get.sgnAttitude(player, target);
						if (!target.countCards("he") || target.hasSkillTag("nogain")) effect /= 10;
						if (target.hasSkillTag("noh") || target.hasSkillTag("noe")) effect *= 3;
						return effect;
					};
					"step 1"
					if (result.targets?.length) {
						const target = result.targets[0];
						player.logSkill(event.name, target);
						if (target != player) player.addExpose(0.2);
						target.draw("nodelay");
						const playerTranslation = get.translation(player);
						target.chooseToDiscard(`${get.skillTranslation(event.name, player)}：弃置一张牌，然后当${playerTranslation}于此回合内检测本技能发动合法性时，视为${playerTranslation}本回合使用的花色为弃置的牌的花色的牌数-1`, "he", true).delay = false;
					}
					else event.finish();
					"step 2"
					event.discardedCardSuit = get.suit(result.cards);
				}
			},
			// Blue
			avn_midas_touch: {
				frequent: true,
				trigger: {
					global: "phaseJieshuBegin"
				},
				filter: (event, player) => player.getHistory("useCard", evt => get.type2(evt.card)).length,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.showCards(event.cards = game.cardsGotoOrdering(get.cards(event.num = new Set(player.getHistory("useCard", evt => get.type2(evt.card)).map(value => get.type2(value.card))).size)).cards, `${get.translation(player)}发动了【${get.skillTranslation(event.name, player)}】`);
					"step 1"
					if (cards.length) player.chooseTarget([1, event.num], `${get.skillTranslation(event.name, player)}：你可以指定至多${get.cnNumber(event.num)}名角色，这些角色依次可以获得${get.translation(cards)}${cards.length > 1 ? "中的一张牌" : ""}`).ai = target => {
						const attitude = _status.event.player.attitudeTo(target), squareRootOfAttitude = attitude < 0 ? -Math.sqrt(-attitude) : Math.sqrt(attitude), cards = _status.event.getParent().cards, preChosenTargets = [...ui.selected.targets, target].sortBySeat(_status.currentPhase || player);
						preChosenTargets.splice(preChosenTargets.indexOf(target));
						if (!preChosenTargets.length) {
							const possibleEffects = cards.map(value => squareRootOfAttitude * get.value(value, target));
							return attitude > 0 ? Math.max(...possibleEffects) : Math.min(...possibleEffects);
						}
						const possibleEffects = preChosenTargets.reduce((previousValue, currentValue) => {
							const possibleCardValues = previousValue.map(value => get.value(value, currentValue)), max = Math.max(...possibleCardValues);
							if (max > 0) previousValue.splice(possibleCardValues.indexOf(max), 1);
							return previousValue;
						}, cards.slice()).map(value => squareRootOfAttitude * get.value(value, target));
						return attitude > 0 ? Math.max(...possibleEffects) : Math.min(...possibleEffects);
					};
					else event.finish();
					"step 2"
					if (result.targets?.length) {
						player.line(event.targets = result.targets.sortBySeat(_status.currentPhase || player), "green");
						event.num = 0;
					}
					else event.finish();
					"step 3"
					targets[num].chooseCardButton(`${get.skillTranslation(event.name, player)}：你可以获得${get.translation(cards)}${cards.length > 1 ? "中的一张牌" : ""}`, cards).ai = button => get.value(button.link, _status.event.player);
					"step 4"
					if (result.links?.length) {
						const links = result.links;
						cards.removeArray(links);
						targets[num].gain(links, "gain2");
					}
					if (++event.num < targets.length) event.goto(3);
				}
			},
			// ViraBot
			avn_infection: {
				direct: true,
				trigger: {
					player: "phaseUseEnd"
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseTarget(get.prompt2(event.name), (card, player, target) => target.countCards("h"), target => {
						const attitude = _status.event.player.attitudeTo(target);
						return (attitude < 0 ? -Math.sqrt(-attitude) : Math.sqrt(attitude)) * (() => {
							if (target.countCards("h") == 0 || target.hasSkillTag("noh")) return 0;
							if (attitude <= 0 && !target.countCards("h")) return 1.5;
							return -1.5;
						})();
					});
					"step 1"
					if (result.targets?.length) {
						const target = event.target = result.targets[0];
						player.logSkill(event.name, target);
						if (target != player) player.addExpose(0.2);
						player.choosePlayerCard(`${get.skillTranslation(event.name, player)}：展示${get.translation(target)}的一张手牌，然后若此牌为红色，你获得此牌，否则你删除此牌`, target, "h", true);
					}
					else event.finish();
					"step 2"
					if (result.links?.length) player.showCards(event.cards = result.links, `${get.translation(player)}对${(targets => {
						if (get.itemtype(targets) == "player") targets = [targets];
						if (targets[0] != player) return get.translation(targets);
						const targetsIncludingSelf = targets.slice();
						targetsIncludingSelf[0] = "自己";
						return get.translation(targetsIncludingSelf);
					})(target)}发动了【${get.skillTranslation(event.name, player)}】`);
					else event.finish();
					"step 3"
					if (get.color(cards) == "red") {
						const gainableCards = cards.filter(value => lib.filter.canBeGained(value, player, target));
						if (gainableCards.length) player.gain(gainableCards, target, "giveAuto", "bySelf");
						return;
					}
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
					if (target != player) player.addExpose(0.2);
				}
			},
			// [Agent]
			avn_surpression: {
				mark: true,
				marktext: "☯",
				intro: {
					content: storage => `${lib.translate.avn_surpression_info_head}【${get.translation(lib.skill.avn_surpression.convertableCards[(storage || 0) % 4])}】${lib.translate.avn_surpression_info_tail}`,
					markcount: storage => (storage || 0) % 4 + 1
				},
				zhuanhuanji: "number",
				hiddenCard: (player, name) => lib.skill.avn_surpression.viewAs(null, player).name == name,
				enable: "phaseUse",
				filter: (event, player) => !player.hasHistory("useSkill", evt => evt.skill == "avn_surpression") && event.filterCard(lib.skill.avn_surpression.viewAs(null, player), player, event),
				position: "hes",
				filterCard: () => false,
				selectCard: -1,
				viewAs: (card, player) => ({
					name: lib.skill.avn_surpression.convertableCards[player.countMark("avn_surpression") % 4],
					storage: {
						avn_surpression: true
					}
				}),
				popname: true,
				onuse: (result, player) => {
					player.changeZhuanhuanji(result.skill);
					_status.event.oncard = (card, player) => {
						const useCardFinish = game.createEvent("useCardFinish");
						_status.event.next.remove(useCardFinish);
						_status.event.after.push(useCardFinish);
						useCardFinish.player = player;
						useCardFinish.skill = result.skill;
						useCardFinish.setContent(() => {
							"step 0";
							if (player.countMark(skill) > 3) player.chooseTarget(`${get.skillTranslation(skill, player)}：你可以令一名角色本回合不能使用或打出牌`).ai = target => -_status.event.player.attitudeTo(target) * Math.sqrt(target.countCards("h", card => {
								const player = _status.event.player;
								return lib.filter.cardEnabled(card, player, "forceEnable") && lib.filter.cardRespondable(card, player) && lib.filter.cardUsable(card, player);
							}) + 1);
							else event.finish();
							"step 1";
							if (!result.targets?.length) return;
							player.line(event.target = result.targets[0], "green");
							if (event.target != player) player.addExpose(0.2);
							event.target.addTempSkill(`${skill}_effect`);
							game.log(player, "令", event.target, "本回合不能使用或打出牌");
							game.delayex();
						});
					};
				},
				convertableCards: ["avn_rotate", "avn_move", "avn_click", "avn_drag"],
				ai: {
					order: (item, player) => get.order(lib.skill.avn_surpression.viewAs(null, player)) - 0.1,
					effect: {
						player: card => {
							if (card.storage?.avn_surpression) return [1, 3];
						}
					}
				}
			},
			avn_surpression_effect: {
				charlotte: true,
				mark: true,
				intro: {
					content: "你本回合不能使用或打出牌"
				},
				mod: {
					cardEnabled2: () => false
				}
			},
			// Herobrine
			avn_out_of_context: {
				init: player => {
					if (!player.storage.renku) player.storage.renku = true;
				},
				direct: true,
				trigger: {
					player: "changeHp",
					global: ["loseAfter", "loseAsyncAfter", "addToExpansionAfter", "cardsGotoSpecialAfter"]
				},
				filter: (event, player, name) => {
					if (name == "changeHp") return event.num < 0 && player.countCards("hej");
					if (name == "loseAfter" || name == "loseAsyncAfter") return event.getlx !== false && event.toStorage;
					if (name == "cardsGotoSpecialAfter") return !event.notrigger;
					return true;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (event.triggername == "changeHp") player.choosePlayerCard(player, "hej", [1, 6], `###${get.prompt(event.name)}###你可以将区域内的至多六张牌置入仁库。若如此做，本回合结束后，你将仁库中的等量牌交给一名角色`, button => {
						const effect = get.buttonValue(button) - 3;
						return !ui.selected.buttons.length || get.position(button.link) == "h" && _status.event.player.countCards("h") - ui.selected.buttons.filter(value => get.position(value.link) == "h").length > _status.event.player.maxHp ? effect + 5 : effect;
					});
					else player.chooseTarget(get.prompt(event.name), "你可以令一名手牌数不大于体力上限的角色获得牌堆底的一张牌", (card, player, target) => target.countCards("h") <= target.maxHp, target => {
						const effect = get.sgnAttitude(_status.event.player, target);
						return target.hasSkillTag("nogain") ? effect / 10 : effect;
					});
					"step 1"
					if (event.triggername == "changeHp") {
						if (!result.cards?.length) return;
						const cards = result.cards;
						player.logSkill(event.name);
						const uiClear = game.createEvent("uiClear"), loseFinish = game.createEvent("loseFinish");
						event.next.removeArray([uiClear, loseFinish]);
						player.$throw(cards);
						player.lose(cards, ui.special, "toRenku").after.push(uiClear, loseFinish);
						game.log(player, "将", cards, "置入了仁库");
						uiClear.setContent(() => {
							game.broadcastAll(ui.clear);
						});
						loseFinish.player = player;
						loseFinish.skill = event.name;
						loseFinish.num = cards.length;
						loseFinish.setContent(() => {
							const name = `${skill}_effect`;
							player.addMark(name, num, false);
							player.addTempSkill(name, {
								player: `${name}Begin`
							});
						});
					}
					else if (result.targets?.length) {
						const target = result.targets[0];
						player.logSkill(event.name, target);
						target.gain(get.bottomCards(), "draw");
						if (target != player) player.addExpose(0.2);
						game.log(target, "获得了牌堆底的一张牌");
					}
				}
			},
			avn_out_of_context_effect: {
				charlotte: true,
				init: player => {
					if (!player.storage.renku) player.storage.renku = true;
				},
				intro: {
					content: (storage, player) => `本回合结束后，你将仁库中的${get.cnNumber(Math.min(_status.renku.filter(value => game.hasPlayer(current => lib.filter.canBeGained(value, current, player))).length, player.countMark("avn_out_of_context_effect")))}张牌交给一名角色`,
				},
				direct: true,
				trigger: {
					global: "phaseAfter"
				},
				filter: (event, player) => player.hasMark("avn_out_of_context_effect") && _status.renku.filter(value => game.hasPlayer(current => lib.filter.canBeGained(value, current, player))).length,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const numberOfRenkuCardsGivable = _status.renku.filter(value => game.hasPlayer(current => lib.filter.canBeGained(value, current, player))).length;
					if (!numberOfRenkuCardsGivable) {
						event.finish();
						return;
					}
					const name = event.name, countMark = event.num = player.countMark(name), numberOfRenkuCardsToGive = Math.min(numberOfRenkuCardsGivable, countMark);
					player.removeMark(name, countMark, false);
					player.chooseTarget(
						`${get.skillTranslation(name, player)}：将仁库中的${get.cnNumber(numberOfRenkuCardsToGive)}张牌交给一名角色`,
						true,
						(card, player, target) => _status.renku.filter(value => lib.filter.canBeGained(value, target, player)).length >= _status.event.numberOfRenkuCardsToGive,
						target => Math.max(..._status.renku.filter(value => game.hasPlayer(current => lib.filter.canBeGained(value, current, player))).map(value => get.sgnAttitude(_status.event.player, target) * get.value(value, target)))
					).numberOfRenkuCardsToGive = numberOfRenkuCardsToGive;
					"step 1"
					if (result.targets?.length) {
						const name = event.name, target = event.target = result.targets[0];
						player.logSkill(name, target);
						const renkuCardsGivable = _status.renku.filter(value => lib.filter.canBeGained(value, target, player)), numberOfRenkuCardsGivable = renkuCardsGivable.length;
						if (numberOfRenkuCardsGivable > num) {
							const numberOfCardsNeedToGive = Math.min(numberOfRenkuCardsGivable, num);
							player.chooseCardButton(
								`${get.skillTranslation(name, player)}：将仁库中的${get.cnNumber(numberOfCardsNeedToGive)}张牌交给${get.translation(target)}`,
								true,
								[1, numberOfCardsNeedToGive],
								_status.renku
							).set("filterButton", (button, player) => lib.filter.canBeGained(button.link, _status.event.getParent().target, player)).ai = button => {
								const target = _status.event.getParent().target;
								return _status.event.player.attitudeTo(target) * get.value(button.link, target);
							};
						}
						else event._result = {
							bool: true,
							links: renkuCardsGivable
						};
					}
					else event.finish();
					"step 2"
					const links = result.links;
					if (!links?.length) return;
					_status.renku.removeArray(links);
					game.updateRenku();
					player.$give(links, target);
					player.give(links, target, true).set("fromStorage", true).fromRenku = true;
					if (target != player) player.addExpose(0.2);
				}
			},
			// Purple, Dark Blue, Pink
			avn_ascending: {
				get derivation() {
					const unlockedCharacters = lib.config.avn_unlocked_characters;
					if (unlockedCharacters && ["avn_dark_blue", "avn_pink"].some(unlockedCharacters.includes, unlockedCharacters)) return "avn_ascending_rewrite";
				},
				intro: {
					content: (storage, player) => get.skillInfoTranslation("avn_ascending", player)
				},
				mod: {
					aiOrder: (player, card, num) => {
						if (lib.skill.avn_ascending.isNotAvailable(player)) return;
						const lastUsed = player.getLastUsed();
						if (!lastUsed) return num + 10 / card.number;
						if (card.number > lastUsed.card.number) return Math.max(21 - (card.number - lastUsed.card.number) ** 2, 0.25);
					}
				},
				forced: true,
				popup: false,
				trigger: {
					player: "useCard",
					global: "washCard"
				},
				filter: (event, player, name) => {
					if (name == "washCard") return !player.storage.avn_ascending;
					return !lib.skill.avn_ascending.isNotAvailable(player) && player.getHistory("useCard").length > 1;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const name = event.name;
					if (event.triggername == "washCard") {
						player.logSkill(name);
						player.trySkillAnimate(`${name}_rewrite`, name, player.checkShow(name));
						const unlockedCharacters = lib.config.avn_unlocked_characters ??= [];
						if (["avn_dark_blue", "avn_pink"].some(unlockingCharacter => !unlockedCharacters.includes(unlockingCharacter))) {
							unlockedCharacters.add("avn_dark_blue");
							unlockedCharacters.add("avn_pink");
							game.saveConfigValue("avn_unlocked_characters");
						}
						player.storage[name] = true;
						player.markSkill(name);
						game.log(player, "修改了技能", `#g【${get.skillTranslation(name, player)}】`);
						event.finish();
						return;
					}
					event.isStrictlyIncreasing = player.getHistory("useCard").map(value => value.card.number).every((value, index, array) => !index || value > array[index - 1]);
					if (!player.storage[name]) {
						if (event.isStrictlyIncreasing) {
							player.logSkill(name);
							player.draw("nodelay");
						}
						else if ((event.num = player.getHp()) && player.hasCard(card => lib.filter.cardDiscardable(card, player), "he")) {
							player.logSkill(name);
							player.chooseToDiscard(`${get.skillTranslation(name, player)}：弃置${get.cnNumber(event.num)}张牌`, "he", event.num, true).delay = false;
						}
						event.finish();
						return;
					}
					if (event.isStrictlyIncreasing) player.chooseTarget(`${get.skillTranslation(name, player)}：令一名角色摸一张牌`, true).set("targetprompt", "摸一张牌").ai = target => {
						const effect = _status.event.player.attitudeTo(target);
						if (target.hasSkillTag("nogain")) return effect / 10;
						return effect;
					};
					else if ((event.num = player.getHp()) && game.hasPlayer(current => current.countDiscardableCards(player, "he"))) player.chooseTarget(`${get.skillTranslation(name, player)}：弃置一名角色的至多${get.cnNumber(event.num)}张牌`, true, (card, player, target) => target.countDiscardableCards(player, "he")).set("targetprompt", "被弃置牌").ai = target => {
						const player = _status.event.player;
						return get.effect(target, {
							name: "guohe_copy2"
						}, player, player);
					};
					else event.finish();
					"step 1"
					if (!result.targets?.length) return;
					player.logSkill(event.name, event.target = result.targets[0]);
					if (event.target != player) player.addExpose(0.2);
					if (event.isStrictlyIncreasing) event.target.draw("nodelay");
					else player.discardPlayerCard(event.target, "he", [1, event.num], `${get.skillTranslation(event.name, player)}：弃置${get.translation(event.target)}的至多${get.cnNumber(event.num)}张牌`, true);
				},
				isNotAvailable: player => {
					/**
					 * @param {GameEvent} evt
					 * @returns {boolean}
					 */
					const filter = evt => {
						const parent = evt.getParent(3);
						return parent.name == "avn_ascending" && parent.player == player;
					};
					return player.storage.avn_ascending ? game.hasPlayer2(current => current.hasHistory("lose", filter)) : player.hasHistory("lose", filter);
				},
				ai: {
					effect: {
						player: (card, player) => {
							if (player.storage.avn_ascending) return;
							const lastUsed = player.getLastUsed();
							if (!lastUsed) return;
							if (!(card.number > lastUsed.card.number)) return [1, -player.getHp()];
						}
					}
				}
			},
			avn_ascending_rewrite: {
				skillAnimation: true,
				animationStr: "攀铭",
				animationColor: "thunder"
			},
			// King Orange, Gold
			avn_resistant: {
				get derivation() {
					if (lib.config.avn_unlocked_characters?.includes("avn_gold")) return "avn_resistant_rewrite";
				},
				intro: {
					content: (storage, player) => get.skillInfoTranslation("avn_resistant", player)
				},
				locked: true,
				mod: {
					aiOrder: (player, card, num) => {
						if (card.number == 13) return Math.max(num - 2, 0.25);
					}
				},
				forced: true,
				popup: false,
				trigger: {
					source: "damageSource",
					player: "damageEnd",
					global: "washCard"
				},
				filter: (event, player, name) => name == "washCard" || !lib.skill.avn_resistant.isNotAvailable(player),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const name = event.name;
					if (event.triggername == "washCard") {
						player.logSkill(name);
						player.trySkillAnimate(`${name}_rewrite`, name, player.checkShow(name));
						const unlockedCharacters = lib.config.avn_unlocked_characters ??= [];
						if (!unlockedCharacters.includes("avn_gold")) {
							unlockedCharacters.add("avn_gold");
							game.saveConfigValue("avn_unlocked_characters");
						}
						player.storage[name] = true;
						player.markSkill(name);
						game.log(player, "修改了技能", `#g【${get.skillTranslation(name, player)}】`);
						event.finish();
						return;
					}
					if (!player.storage[name]) {
						player.logSkill(event.name);
						const bottomCards = game.cardsGotoOrdering(get.bottomCards(Math.max(player.getDamagedHp(), 1))).cards;
						player.showCards(bottomCards);
						player.gain(bottomCards, "gain2");
						if (bottomCards.some(value => get.number(value) == 13)) {
							player.gain(get.bottomCards(), "draw");
							game.log(player, "获得了牌堆底的一张牌");
						}
						event.finish();
						return;
					}
					player.chooseTarget(`${get.skillTranslation(name, player)}：令一名角色亮出并获得牌堆底的${get.cnNumber(Math.max(player.getDamagedHp(), 1))}张牌，然后若这些牌中有点数为K的牌，则其获得牌堆底的一张牌`, true).ai = target => {
						const player = _status.event.player, sgnAttitude = get.sgnAttitude(player, target);
						if (!sgnAttitude) return 0;
						let effect = sgnAttitude * Math.max(player.getDamagedHp(), 1);
						if (target.hasSkillTag("nogain")) effect /= 10;
						return effect;
					}
					"step 1"
					if (!result.targets?.length) return;
					const chosenTarget = result.targets[0];
					player.logSkill(event.name, chosenTarget);
					if (chosenTarget != player) player.addExpose(0.2);
					const bottomCards = game.cardsGotoOrdering(get.bottomCards(Math.max(player.getDamagedHp(), 1))).cards;
					chosenTarget.showCards(bottomCards);
					chosenTarget.gain(bottomCards, "gain2");
					if (bottomCards.every(value => get.number(value) != 13)) return;
					chosenTarget.gain(get.bottomCards(), "draw");
					game.log(chosenTarget, "获得了牌堆底的一张牌");
				},
				isNotAvailable: (player) => {
					/**
					 * @param {GameEvent} evt
					 * @returns {boolean}
					 */
					const filter = evt => {
						const parent = evt.getParent();
						return parent.name == "avn_resistant" && parent.player == player;
					};
					return player.storage.avn_resistant ? game.hasPlayer2(current => current.hasHistory("gain", filter)) : player.hasHistory("gain", filter);
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					skillTagFilter: player => {
						if (lib.skill.avn_resistant.isNotAvailable(player)) return false;
					},
					effect: {
						target: (card, player, target) => {
							if (lib.skill.avn_resistant.isNotAvailable(target) || !get.tag(card, "damage")) return;
							if (player.hasSkillTag("jueqing", false, target)) return [1, -2];
							if (!target.hasFriend()) return;
							const result = player.attitudeTo(target) > 0 ? player.needsToDiscard() ? 0.7 : 0.5 : 1;
							if (target.hp >= 4) return [1, result * 2];
							if (target.hp == 3) return [1, result * 1.5];
							if (target.hp == 2) return [1, result * 0.5];
						}
					}
				}
			},
			avn_resistant_rewrite: {
				skillAnimation: true,
				animationStr: "抵倾",
				animationColor: "orange"
			},
			// Butcher
			avn_cookery: {
				direct: true,
				trigger: {
					global: "phaseJieshuBegin"
				},
				filter: (event, player) => player.getHistory("useCard", evt => get.type2(evt.card)).length,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseTarget(
						[1, event.num = new Set(player.getHistory("useCard", evt => get.type2(evt.card)).map(evt => get.type2(evt.card))).size],
						get.prompt2(event.name),
						(testingCard, testingPlayer, testingTarget) => testingTarget.countCards("h"),
						aiTarget => {
							const aiPlayer = _status.event.player;
							return aiTarget.isTurnedOver() || aiTarget.isLinked() && get.effect(aiTarget, {
								name: "tiesuo"
							}, aiPlayer, aiPlayer) > 0 ? aiPlayer.attitudeTo(aiTarget) : -aiPlayer.attitudeTo(aiTarget);
						}
					);
					"step 1"
					if (result.targets?.length) {
						player.logSkill(event.name, event.targets = result.targets.sortBySeat(_status.currentPhase || player));
						event.cards = [];
						event.targetsIndex = 0;
					}
					else event.finish();
					"step 2"
					player.choosePlayerCard(
						event.target = targets[event.targetsIndex],
						`${get.skillTranslation(event.name, player)}：明置或暗置${get.translation(event.target)}的一张手牌`,
						"h",
						true
					);
					"step 3"
					const links = result.links;
					if (links?.length) {
						cards.addArray(links);
						links.forEach(chosenCard => {
							if (get.is.shownCard(chosenCard)) target.hideShownCards([chosenCard]);
							else target.addShownCards([chosenCard], `visible_${event.name}`);
						});
					}
					if (++event.targetsIndex < targets.length) event.goto(2);
					"step 4"
					game.delayx();
					const typesForAllSame = cards.map(chosenCard => get.type2(chosenCard)), targetsLength = targets.length;
					if (typesForAllSame.length && typesForAllSame.slice(0, -1).every((type, index) => typesForAllSame.slice(index + 1).every(testingType => testingType == type))) player.chooseTarget(
						[1, targetsLength],
						`${get.skillTranslation(event.name, player)}：你可以${targetsLength > 1 ? `依次横置或重置${get.translation(targets)}中的任意名角色` : `横置或重置${get.translation(targets)}`}`,
						(testingCard, testingPlayer, testingTarget) => _status.event.getParent().targets.includes(testingTarget),
						aiTarget => {
							const aiPlayer = _status.event.player;
							return get.effect(aiTarget, {
								name: "tiesuo"
							}, aiPlayer, aiPlayer);
						}
					);
					else event.goto(6);
					"step 5"
					const linkingTargets = result.targets;
					if (!linkingTargets?.length) return;
					player.line(linkingTargets.sortBySeat(_status.currentPhase || player), "green");
					player.addExpose(0.2);
					linkingTargets.forEach(linkingTarget => linkingTarget.link());
					game.delayex();
					"step 6"
					const typesForAllDifferent = cards.map(chosenCard => get.type2(chosenCard));
					if (typesForAllDifferent.length > 1 && typesForAllDifferent.slice(0, -1).every((type, index) => typesForAllDifferent.slice(index + 1).every(testingType => testingType != type))) player.chooseTarget(
						`${get.skillTranslation(event.name, player)}：你可以令${targets.length > 1 ? `${get.translation(targets)}中的一名角色翻面` : `${get.translation(targets)}翻面`}`,
						(testingCard, testingPlayer, testingTarget) => _status.event.getParent().targets.includes(testingTarget),
						aiTarget => {
							if (aiTarget.hasSkillTag("noturn")) return 0;
							const attitude = _status.event.player.attitudeTo(aiTarget);
							if (attitude > 0) return aiTarget.isTurnedOver() ? attitude : -1;
							if (attitude < 0) {
								if (aiTarget.isTurnedOver()) return attitude;
								const currentPhase = _status.currentPhase;
								if (currentPhase && aiTarget.getSeatNum() <= currentPhase.getSeatNum()) return -attitude;
								return 42.5 * Math.sqrt(Math.max(0.01, get.threaten(aiTarget))) + 2 * game.countPlayer() / (currentPhase ? get.distance(currentPhase, aiTarget, "absolute") : 1);
							}
							return aiTarget.hasJudge("lebu") ? Math.random() / 3 : Math.sqrt(get.threaten(aiTarget)) / 5 + Math.random() / 2;
						}
					);
					else event.finish();
					"step 7"
					const turningOverTargets = result.targets;
					if (!turningOverTargets?.length) return;
					player.line(turningOverTargets.sortBySeat(_status.currentPhase || player), "green");
					player.addExpose(0.2);
					turningOverTargets.forEach(turningOverTarget => turningOverTarget.turnOver());
					game.delayex();
				}
			},
			// Alexcrafter28
			avn_encounter: {
				enable: "phaseUse",
				usable: 1,
				chooseButton: {
					dialog: (event, player) => ui.create.dialog(`###${get.skillTranslation("avn_encounter", player)}###${get.skillInfoTranslation("avn_encounter", player)}`),
					chooseControl: () => lib.suit.concat(lib.inpile.reduce((previousValue, currentValue) => {
						const type = get.type2(currentValue);
						if (!previousValue.includes(type)) previousValue.push(type);
						return previousValue;
					}, [])),
					check: event => {
						const cardPile = Array.from(ui.cardPile.childNodes), suit = lib.suit, results = event.controls.reduce((previousValue, currentValue) => {
							previousValue.push(cardPile.filter(value => suit.includes(currentValue) && get.suit(value) == currentValue || get.type2(value) == currentValue).length);
							return previousValue;
						}, []);
						const max = Math.max(...results);
						return results.reduce((previousValue, currentValue, currentIndex) => {
							if (currentValue == max) previousValue.push(currentIndex);
							return previousValue;
						}, []).randomGet();
					},
					backup: result => ({
						delay: false,
						control: result.control,
						content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
							"step 0"
							const controlTranslation = event.controlTranslation = get.translation(lib.skill.avn_encounter_backup.control);
							game.log(player, "声明了", `#y${controlTranslation}`);
							const topCardsOfCardPile = event.cards = get.cards(10);
							topCardsOfCardPile.forEach(value => ui.cardPile.insertBefore(value, ui.cardPile.firstChild));
							game.updateRoundNumber();
							player.showCards(topCardsOfCardPile, `${get.translation(player)}发动了【${get.skillTranslation(event.name, player)}】（声明了${controlTranslation}）`);
							"step 1"
							const chooseCardButton = player.chooseCardButton(`${get.skillTranslation(event.name, player)}：你可以获得一张展示的${event.controlTranslation}牌`, cards);
							chooseCardButton.filterButton = button => {
								const link = button.link, control = lib.skill.avn_encounter_backup.control;
								return get.suit(link) == control || get.type2(link) == control;
							};
							chooseCardButton.ai = button => _status.event.player.getUseValue(button.link, true, true);
							"step 2"
							const links = result.links;
							if (links?.length) player.gain(links, "gain2");
						}
					}),
					prompt: result => {
						const controlTranslation = get.translation(result.control);
						return `声明${controlTranslation}并展示牌堆顶的十张牌，若如此做，你可以获得一张展示的${controlTranslation}牌`;
					}
				},
				ai: {
					order: 10,
					result: {
						player: 1
					}
				}
			},
			// Warden
			ska_zhenhan: {
				direct: true,
				trigger: {
					player: "phaseZhunbeiBegin",
					global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter", "equipAfter"]
				},
				filter: (event, player, name) => name == "phaseZhunbeiBegin" || event.getd().some(card => get.cardtag(card, "gifts")),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseTarget(get.prompt2("ska_zhenhan"), lib.filter.notMe, target => {
						const player = _status.event.player;
						return get.distance(player, target) > 1 ? -player.attitudeTo(target) : get.effect(target, {
							name: "losehp"
						}, player, player);
					}).targetprompt = target => get.distance(_status.event.player, target) > 1 ? "距离-1" : "失去体力";
					"step 1"
					if (result.targets?.length) {
						const target = result.targets[0];
						player.logSkill("ska_zhenhan", target);
						if (get.distance(player, target) > 1) {
							player.addSkill("ska_zhenhan_effect");
							if (typeof player.storage.ska_zhenhan_effect[target.playerid] != "number") player.storage.ska_zhenhan_effect[target.playerid] = 1;
							else player.storage.ska_zhenhan_effect[target.playerid]++;
							player.markSkill("ska_zhenhan_effect");
							event.finish();
						}
						else target.loseHp();
					}
					else event.finish();
					"step 2"
					player.removeSkill("ska_zhenhan_effect");
				},
				ai: {
					expose: 0.2
				}
			},
			ska_zhenhan_effect: {
				charlotte: true,
				init: player => {
					if (typeof player.storage.ska_zhenhan_effect != "object") player.storage.ska_zhenhan_effect = {};
				},
				onremove: true,
				intro: {
					content: (storage, player) => game.filterPlayer2(current => typeof storage[current.playerid] == "number").sortBySeat(_status.currentPhase || player).map(current => `你本局游戏至${get.translation(current)}的距离-${storage[current.playerid]}`).join("<br>"),
					markcount: storage => Object.values(storage).reduce((previousValue, currentValue) => previousValue + currentValue, 0)
				},
				mod: {
					globalFrom: (from, to, distance) => {
						if (typeof from.storage.ska_zhenhan_effect == "object" && typeof from.storage.ska_zhenhan_effect[to.playerid] == "number") return distance - from.storage.ska_zhenhan_effect[to.playerid];
					}
				}
			},
			// Mario
			sst_jueyi: {
				mod: {
					aiOrder: (player, card, num) => {
						if (player.canUse(card, player) && !game.hasPlayer(current => current != player && player.canUse(card, current))) return num + 10;
					}
				},
				forced: true,
				trigger: {
					player: "useCardToPlayer"
				},
				filter: (event, player) => event.getParent().targets.contains(event.target) && event.target.countCards("h") > player.countCards("h"),
				logTarget: "target",
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					player.draw("nodelay");
					trigger.getParent().directHit.add(trigger.target);
				},
				ai: {
					directHit_ai: true,
					skillTagFilter: (player, tag, arg) => arg.target.countCards("h") > player.countCards("h")
				}
			},
			// Euler’s identity
			avn_mathematics: {
				hiddenCard: (player, name) => {
					const cards = player.getCards("hes", card => lib.skill.avn_mathematics.isValidNumber(card, player));
					return cards.length && lib.inpile.includes(name) && ["basic", "trick"].includes(get.type(name)) && lib.skill.avn_mathematics.hasValidCombination(player, cards.map(value => get.number(value)));
				},
				enable: ["chooseToUse", "chooseToRespond"],
				filter: (event, player) => {
					const cards = player.getCards("hes", card => lib.skill.avn_mathematics.isValidNumber(card, player));
					if (!cards.length || !lib.skill.avn_mathematics.hasValidCombination(player, cards.map(value => get.number(value)))) return false;
					const types = ["basic", "trick"], filterCard = event.filterCard;
					return lib.inpile.some(value => types.includes(get.type(value)) && filterCard({
						name: value
					}, player, event));
				},
				prompt: () => {
					const player = _status.event.player;
					return [get.skillInfoTranslation("avn_mathematics", player), lib.skill.avn_mathematics.getAvailableCombinationsPrompt(player)].join(lineBreak);
				},
				chooseButton: {
					dialog: (event, player) => ui.create.dialog(get.skillTranslation("avn_mathematics", player), [lib.inpile.reduce((previousValue, currentValue) => {
						const type = get.type(currentValue);
						if (!["basic", "trick"].includes(type)) return previousValue;
						const filterCard = event.filterCard;
						if (filterCard({
							name: currentValue
						}, player, event)) previousValue.push([get.translation(type), "", currentValue]);
						if (currentValue == "sha") lib.inpile_nature.forEach(value => {
							if (filterCard({
								name: currentValue,
								nature: value
							}, player, event)) previousValue.push([get.translation(type), "", currentValue, value]);
						});
						return previousValue;
					}, []), "vcard"]),
					filter: (button, player) => {
						const parent = _status.event.getParent();
						return parent.filterCard({
							name: button.link[2]
						}, player, parent);
					},
					check: button => {
						const event = _status.event;
						if (event.getParent().type != "phase") return 1;
						const [, , name, nature] = button.link;
						if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].includes(name)) return 0;
						const player = event.player;
						return (!player.isPhaseUsing() || !player.hasHistory("useSkill", evt => {
							if (evt.skill != "avn_mathematics_backup") return false;
							const card = evt.event.card;
							return card.name == name && card.nature == nature;
						})) && player.getUseValue({
							name: name,
							nature: nature
						});
					},
					backup: (links, player) => {
						const link = links[0];
						return {
							bestCombination: lib.skill.avn_mathematics.getCombinations(player.getCards("hes", card => lib.skill.avn_mathematics.isValidNumber(card, player)).reduce((previousValue, currentValue) => {
								previousValue.push({
									number: get.number(currentValue),
									card: currentValue
								});
								return previousValue;
							}, [{
								number: player.countCards("hej")
							}, {
								number: game.countPlayer(current => current.countCards("ej"))
							}]), 3).filter(value => {
								const [{
									number: first
								}, {
									number: second
								}, {
									number: third
								}] = value.sort((a, b) => a.number - b.number);
								return first + third == second + second || value.every(element => element.number != 0) && first * third == second * second;
							}).reduce((previousValue, currentValue) => {
								const cards = currentValue.reduce((previousElement, currentElement) => {
									const card = currentElement.card;
									if (card) previousElement.push(card);
									return previousElement;
								}, []);
								if (previousValue.every(value => value.length != cards.length || value.some(element => !cards.includes(element)))) previousValue.push(cards);
								return previousValue;
							}, []).sort((a, b) => {
								const callbackfn = (previousValue, currentValue) => previousValue + get.value(currentValue);
								return b.reduce(callbackfn, 0) - a.reduce(callbackfn, 0);
							}).pop(),
							audio: false,
							popname: true,
							position: "hes",
							filterCard: lib.skill.avn_mathematics.isValidNumber,
							selectCard: () => {
								const cards = ui.selected.cards;
								return cards.length && lib.skill.avn_mathematics.hasValidCombination(_status.event.player, cards.map(value => get.number(value))) ? [1, Infinity] : Infinity;
							},
							viewAs: {
								name: link[2],
								nature: link[3]
							},
							ai1: card => lib.skill.avn_mathematics_backup.bestCombination.includes(card) && 8 - get.value(card)
						};
					},
					prompt: (links, player) => {
						const link = links[0];
						return [`将至少一张牌当做${get.translation({
							name: link[2],
							nature: link[3]
						})}使用或打出`, lib.skill.avn_mathematics.getAvailableCombinationsPrompt(player)].join(lineBreak);
					}
				},
				isValidNumber: (card, player) => !player.hasHistory("useSkill", evt => evt.skill == "avn_mathematics_backup" && evt.event.cards.some(testingCard => get.number(testingCard) == get.number(card))),
				getCombinations: (array, k, prefix = []) => k <= 0 ? [prefix] : array.flatMap((value, index) => lib.skill.avn_mathematics.getCombinations(array.slice(index + 1), k - 1, prefix.concat(value))),
				getAvailableCombinationsPrompt: player => [
					"↓可以选择的牌的点数的组合↓",
					lib.skill.avn_mathematics.getCombinations(player.getCards("hes", card => lib.skill.avn_mathematics.isValidNumber(card, player)).reduce((array, card) => {
						array.push({
							number: get.number(card),
							card
						});
						return array;
					}, [
						{
							number: player.countCards("hej")
						},
						{
							number: game.countPlayer(current => current.countCards("ej"))
						}
					]), 3).filter(combination => {
						const [
							{
								number: first
							},
							{
								number: second
							},
							{
								number: third
							}
						] = combination.sort((a, b) => a.number - b.number);
						return first + third == second + second || combination.every(item => item.number != 0) && first * third == second * second;
					}).reduce((numberCombinations, combination) => {
						const numbers = combination.reduce((constructingNumbers, item) => {
							if (item.card) constructingNumbers.push(item.number);
							return constructingNumbers;
						}, []);
						if (numberCombinations.every(numberCombination => numberCombination.length != numbers.length || numberCombination.some(number => !numbers.includes(number)))) numberCombinations.push(numbers);
						return numberCombinations;
					}, []).reduce((combinationsPrompt, numberCombination) => {
						const combination = `[${numberCombination}]`;
						return combinationsPrompt ? [combinationsPrompt, combination].join(lineBreak) : combination;
					}, "")
				].join(lineBreak),
				hasValidCombination: (player, numbers) => {
					const allNumbers = numbers.concat(player.countCards("hej"), game.countPlayer(current => current.countCards("ej"))), length = allNumbers.length;
					for (let firstIndex = 0; firstIndex < length - 2; firstIndex++) {
						for (let secondIndex = firstIndex + 1; secondIndex < length - 1; secondIndex++) {
							for (let thirdIndex = secondIndex + 1; thirdIndex < length; thirdIndex++) {
								const combination = [allNumbers[firstIndex], allNumbers[secondIndex], allNumbers[thirdIndex]].sort((a, b) => a - b), [first, second, third] = combination;
								if (first + third == second + second || !combination.includes(0) && first * third == second * second) return true;
							}
						}
					}
					return false;
				},
				ai: {
					fireAttack: true,
					respondSha: true,
					respondShan: true,
					respondTao: true,
					save: true,
					skillTagFilter: player => {
						const cards = player.getCards("hes", card => lib.skill.avn_mathematics.isValidNumber(card, player));
						if (!cards.length || !lib.skill.avn_mathematics.hasValidCombination(player, cards.map(value => get.number(value)))) return false;
					},
					order: 10,
					result: {
						player: player => {
							const dying = _status.event.dying;
							return dying ? player.attitudeTo(dying) : 1;
						}
					}
				}
			},
			// Kirby
			sst_qushi: {
				unique: true,
				direct: true,
				trigger: {
					source: "damageEnd"
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.chooseControl(trigger.player.getStockSkills().filter(value => !player.hasSkill(value) && !get.skillCategoriesOf(skill, trigger.player).length), "draw_card", "cancel2").set("prompt", get.prompt(event.name, trigger.player)).set("prompt2", get.skillInfoTranslation(event.name)).ai = event => {
						const controls = event.controls.slice(0, -2).filter(value => {
							const info = lib.skill[value];
							if (info.ai?.maixie_hp || info.ai?.maixie_defend) return false;
							return get.skillRank(value, "in") > 0;
						});
						if (!controls.length) return "draw_card";
						return get.max(controls, get.skillRank, "item");
					};
					"step 1"
					if (result.control == "cancel2") return;
					player.logSkill("sst_qushi", trigger.player);
					if (result.control == "draw_card") player.draw();
					else {
						player.popup(result.control, "thunder");
						game.log(player, "获得了技能", `#g【${get.translation(result.control)}】`);
						player.addTempSkill(result.control, {
							player: "damageEnd"
						});
					}
				}
			},
			// Corn Dog Guy
			avn_rebranding: {
				derivation: "avn_rebranding_rewrite",
				global: "avn_rebranding_global",
				intro: {
					content: (storage, player) => get.skillInfoTranslation("avn_rebranding", player)
				},
				locked: false,
				forced: true,
				trigger: {
					player: "damageEnd"
				},
				filter: (event, player) => !player.storage.avn_rebranding,
				content: (event, step, source, player) => {
					const name = event.name;
					player.storage[name] = true;
					player.markSkill(name);
					game.log(player, "修改了技能", `#g【${get.skillTranslation(name, player)}】`);
				},
				subSkill: {
					global: {
						audio: false,
						delay: false,
						enable: "phaseUse",
						usable: 1,
						position: "he",
						filter: (event, player) => {
							return game.hasPlayer(current => current.hasSkill("avn_rebranding") && player.countCards(lib.skill.avn_rebranding_global.position, card => current == player ? lib.filter.cardDiscardable(card, player) : player.canGift(card, current)) > (current.storage.avn_rebranding ? 1 : 0));
						},
						filterCard: (card, player) => game.hasPlayer(current => current.hasSkill("avn_rebranding") && (current == player ? lib.filter.cardDiscardable(card, player) : player.canGift(card, current))),
						selectCard: () => {
							const players = game.filterPlayer(current => current.hasSkill("avn_rebranding"));
							return [players.filter(value => !value.storage.avn_rebranding).length ? 1 : 2, players.filter(value => value.storage.avn_rebranding).length ? 2 : 1];
						},
						filterTarget: (card, player, target) => target.hasSkill("avn_rebranding") && (ui.selected.cards.length > 1 ? target.storage.avn_rebranding : !target.storage.avn_rebranding) && (target == player || ui.selected.cards.every(value => player.canGift(value, target))),
						discard: false,
						lose: false,
						check: card => {
							const player = _status.event.player;
							return Math.max(...game.filterPlayer(current => current.hasSkill("avn_rebranding") && (current == player ? lib.filter.cardDiscardable(card, player) : player.canGift(card, current))).map(value => value == player ? 6 - get.value(card) : player.getGiftEffect(card, value)));
						},
						content: (event, step, source, player, target, targets, card, cards) => {
							if (target == player) player.discard(cards);
							else player.gift(cards, target);
							if (target.storage[event.name.slice(0, -7)]) {
								player.changeHujia(1, null, true);
								game.delayex();
							}
							else player.draw();
						},
						ai: {
							order: 2,
							result: {
								target: (player, target) => {
									if (target == player) return 1;
									const cards = ui.selected.cards;
									return cards.reduce((previousValue, currentValue) => previousValue + player.getGiftAIResultTarget(currentValue, target), 0) / cards.length;
								}
							}
						}
					}
				}
			}
		},
		dynamicTranslate: {
			avn_surpression: player => `${lib.translate.avn_surpression_info_head}${lib.skill.avn_surpression.convertableCards.reduce((previousValue, currentValue, currentIndex) => {
				const translation = `${String.fromCharCode(9312 + currentIndex)}【${get.translation(currentValue)}】`;
				if (currentIndex != player.countMark("avn_surpression") % 4) return `${previousValue}${translation}`;
				const span = document.createElement("span");
				span.classList.add("bluetext");
				span.textContent = translation;
				return `${previousValue}${span.outerHTML}`;
			}, "")}${lib.translate.avn_surpression_info_tail}`,
			avn_ascending: player => player.storage.avn_ascending ? lib.translate.avn_ascending_rewrite_info : lib.translate.avn_ascending_info,
			avn_resistant: player => player.storage.avn_resistant ? lib.translate.avn_resistant_rewrite_info : lib.translate.avn_resistant_info,
			avn_rebranding: player => player.storage.avn_rebranding ? lib.translate.avn_rebranding_rewrite_info : lib.translate.avn_rebranding_info
		},
		characterReplace: {
			avn_the_second_coming: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return"],
			avn_purple: ["avn_purple", "avn_dark_blue", "avn_pink"],
			avn_king_orange: ["avn_king_orange", "avn_gold"]
		},
		translate: {
			// Rule
			_avn_dynamic_link: "动态链接",
			_avn_dynamic_link_info: "游戏开始时，若游戏模式不为国战模式，且游戏未开启双将模式，且你未以此法变更过武将牌，且有与你不同阵营的角色的主将的评级大于精品，且你的主将为《桌面大战》的武将牌，则你可以将一张与你的武将牌为珠联璧合的《桌面大战》的武将牌作为副将，然后将基础体力上限改为4；回合开始时，你可以变更《桌面大战》的主将为另一张与副将为珠联璧合的《桌面大战》的武将牌，或变更《桌面大战》的副将为另一张与主将为珠联璧合的《桌面大战》的武将牌。",
			// Animator vs. Animation
			avn_animator_vs_animation: "AvA",
			// Alan Becker
			avn_alan_becker: "Alan Becker",
			avn_alan_becker_ab: "Alan",
			avn_animate: "赋名",
			avn_animate_rt: "Animate",
			get avn_animate_effect() {
				return lib.translate.avn_animate;
			},
			avn_animate_info: "出牌阶段限一次，你可以展示一张基本牌或普通锦囊牌，令一名角色的任意张手牌均视为此牌，直到其使用这些牌中的一张结算后或其回合结束后。",
			// Victim
			avn_victim: "Victim",
			avn_adaptive: "应识",
			avn_adaptive_rt: "Adaptive",
			avn_adaptive_info: "每回合限一次，你可以展示一张基本牌或普通锦囊牌，将一张牌当做展示的牌使用（无距离和次数限制且不计入使用次数），且以此法使用的牌拥有全部应变条件和「摸一张牌」、「获得响应的牌」的应变效果。",
			// The Chosen One
			avn_the_chosen_one: "The Chosen One",
			avn_the_chosen_one_ab: "Chosen",
			avn_overflow: "超限",
			avn_overflow_rt: "Overflow",
			avn_overflow_info: "出牌阶段开始时，你可以展示所有手牌并弃置一种花色的所有手牌（至少一张），对一名角色造成1点属性伤害，然后你可以将弃置的牌中的一张赠予一名手牌数不大于你的其他角色。",
			// The Dark Lord
			avn_the_dark_lord: "The Dark Lord",
			avn_the_dark_lord_ab: "Dark",
			avn_terminal: "终解",
			avn_terminal_rt: "Terminal",
			avn_terminal_info: "出牌阶段结束时，你可以展示一名角色的所有手牌，然后你可以删除其中的一种花色的所有牌。",
			// The Second Coming
			avn_the_second_coming: "The Second Coming",
			avn_the_second_coming_ab: "Second",
			avn_frame_by_frame_drawing: "逐绘",
			avn_frame_by_frame_drawing_rt: "Frame by Frame Drawing",
			get avn_frame_by_frame_drawing_backup() {
				return lib.translate.avn_frame_by_frame_drawing;
			},
			avn_frame_by_frame_drawing_info: "你可以将一张点数不小于你本回合上一张以此法转化的牌的牌当做最后进入弃牌堆的五张牌中的一张与其花色、类别和字数均不同的基本牌或普通锦囊牌使用或打出。",
			// The Second Coming (The Chosen One’s Return)
			get avn_the_second_coming_the_chosen_one_return() {
				return lib.translate.avn_the_second_coming;
			},
			get avn_the_second_coming_the_chosen_one_return_ab() {
				return lib.translate.avn_the_second_coming_ab;
			},
			get avn_the_second_coming_the_chosen_one_return_rt() {
				return lib.translate.avn_the_second_coming_rt;
			},
			avn_awakening: "决唤",
			avn_awakening_rt: "Awakening",
			avn_awakening_info: "出牌阶段限一次，你可以展示一名角色的所有手牌，然后你可以令其回复X点体力或失去X点体力（X为其红色手牌数与黑色手牌数之差）。",
			// Red
			avn_red: "Red",
			avn_combative: "攻端",
			avn_combative_rt: "Combative",
			avn_combative_info: "当有牌被抵消后，你可以使用牌堆顶的一张牌与一名角色拼点，若你赢，则你可以使用一张拼点牌，否则你将你的区域内的一张牌置于武将牌上。当你造成伤害后，你可以将武将牌上的任意张牌交给一名角色。",
			// Yellow
			avn_yellow: "Yellow",
			avn_intelligence: "机埶",
			avn_intelligence_rt: "Intelligence",
			avn_intelligence_info: "每名角色的回合结束时，若此回合不为额外回合，且你本回合使用过的牌的名称字数之和为2的自然数次方，则你可以令一名角色执行一个额外回合。",
			// Green
			avn_green: "Green",
			avn_progressive: "筑韵",
			avn_progressive_rt: "Progressive",
			avn_progressive_info: "当你于一回合内首次使用一种花色的牌时，你可以令一名角色摸一张牌并弃置一张牌，若如此做，当你于此回合内检测本技能发动合法性时，视为你本回合使用的这张弃置的牌的花色的牌数-1。",
			// Blue
			avn_blue: "Blue",
			avn_midas_touch: "点金",
			avn_midas_touch_rt: "Midas Touch",
			avn_midas_touch_info: "每名角色的结束阶段，你可以亮出牌堆顶的你本回合使用的牌的类别数张牌，若如此做，你可以指定至多等量角色，这些角色依次可以获得一张亮出的牌。",
			// ViraBot
			avn_virabot: "ViraBot",
			avn_infection: "侵染",
			avn_infection_rt: "Infection",
			avn_infection_info: "出牌阶段结束时，你可以展示一名角色的一张手牌，若此牌为红色，你获得此牌，否则你删除此牌。",
			// [Agent]
			avn_agent: "[Agent]",
			avn_surpression: "戡定",
			avn_surpression_rt: "Surpression",
			get avn_surpression_effect() {
				return lib.translate.avn_surpression;
			},
			get avn_surpression_info() {
				return `${lib.translate.avn_surpression_info_head}①【旋转】②【移动】③【点击】④【拖拽】${lib.translate.avn_surpression_info_tail}`;
			},
			avn_surpression_info_head: "转换技，每回合限一次，你可以视为使用一张",
			avn_surpression_info_tail: "，若如此做，且本技能的状态被变更过至少4次，你可以令一名角色本回合不能使用或打出牌。",
			// Animation vs. Minecraft
			avn_animation_vs_minecraft: "AvM",
			// Herobrine
			avn_herobrine: "Herobrine",
			avn_out_of_context: "异造",
			avn_out_of_context_rt: "Out of Context",
			get avn_out_of_context_effect() {
				return lib.translate.avn_out_of_context;
			},
			avn_out_of_context_info: "当你扣减体力时，你可以将区域内的至多六张牌置入仁库，若如此做，本回合结束后，你将仁库中的等量牌交给一名角色。当有牌移出游戏后，你可以令一名手牌数不大于体力上限的角色获得牌堆底的一张牌。",
			// Purple
			avn_purple: "Purple",
			avn_ascending: "攀铭",
			avn_ascending_rt: "Ascending",
			_avn_ascending_info: "锁定技，若你本回合未以此法弃置牌，则当你于此回合内使用第二张及以后牌时，若你本回合使用的牌的点数为严格递增，则你摸一张牌，否则你弃置你的体力值张牌。",
			get avn_ascending_info() {
				const unlockedCharacters = lib.config.avn_unlocked_characters, alteringCondition = "牌堆洗牌后，你修改本技能。";
				if (unlockedCharacters && ["avn_dark_blue", "avn_pink"].some(unlockedCharacters.includes, unlockedCharacters)) return `${lib.translate._avn_ascending_info}${alteringCondition}`;
				const span = document.createElement("span"), style = span.style;
				style.backgroundColor = "currentcolor";
				style.textShadow = "none";
				span.textContent = alteringCondition;
				return `${lib.translate._avn_ascending_info}${span.outerHTML}`;
			},
			get avn_ascending_rewrite() {
				return `${lib.translate.avn_ascending}·改`;
			},
			get avn_ascending_rewrite_rt() {
				return `${lib.translate.avn_ascending_rt} Rewrite`;
			},
			avn_ascending_rewrite_info: "锁定技，若你本回合未以此法弃置任意角色的牌，则当你于此回合内使用第二张及以后牌时，若你本回合使用的牌的点数为严格递增，则你令一名角色摸一张牌，否则你弃置一名角色的至多你的体力值张牌。",
			// Dark Blue
			avn_dark_blue: "Dark Blue",
			// Pink
			avn_pink: "Pink",
			// King Orange
			avn_king_orange: "King Orange",
			avn_king_orange_ab: "King",
			avn_resistant: "抵倾",
			avn_resistant_rt: "Resistant",
			_avn_resistant_info: "锁定技，当你造成或受到伤害后，若你本回合未以此法获得牌，则你亮出并获得牌堆底的你已损失的体力值张牌（至少一张），若这些牌中有点数为K的牌，则你获得牌堆底的一张牌。",
			get avn_resistant_info() {
				const alteringCondition = "牌堆洗牌后，你修改本技能。";
				if (lib.config.avn_unlocked_characters?.includes("avn_gold")) return `${lib.translate._avn_resistant_info}${alteringCondition}`;
				const span = document.createElement("span"), style = span.style;
				style.backgroundColor = "currentcolor";
				style.textShadow = "none";
				span.textContent = alteringCondition;
				return `${lib.translate._avn_resistant_info}${span.outerHTML}`;
			},
			get avn_resistant_rewrite() {
				return `${lib.translate.avn_resistant}·改`;
			},
			get avn_resistant_rewrite_rt() {
				return `${lib.translate.avn_resistant_rt} Rewrite`;
			},
			avn_resistant_rewrite_info: "锁定技，当你造成或受到伤害后，若你本回合未以此法令一名角色获得牌，则你令一名角色亮出并获得牌堆底的你已损失的体力值张牌（至少一张），若这些牌中有点数为K的牌，则其获得牌堆底的一张牌。",
			// Butcher
			avn_butcher: "屠夫",
			avn_butcher_rt: "Butcher",
			avn_cookery: "料传",
			avn_cookery_rt: "Cookery",
			get visible_avn_cookery() {
				return lib.translate.avn_cookery;
			},
			avn_cookery_info: "每名角色的结束阶段，你可以依次明置或暗置至多你本回合使用的牌的类别数名角色的一张手牌，若这些牌的类别均：相同，则你可以依次横置或重置其中任意名角色；不相同，则你可以令其中一名角色翻面。",
			// Gold
			avn_gold: "Gold",
			// Alexcrafter28
			avn_alexcrafter28: "Alexcrafter28",
			avn_alexcrafter28_ab: "Alex",
			avn_encounter: "探遇",
			avn_encounter_rt: "Encounter",
			get avn_encounter_backup() {
				return lib.translate.avn_encounter;
			},
			avn_encounter_info: "出牌阶段限一次，你可以声明一种花色或类别并展示牌堆顶的十张牌，若如此做，你可以获得一张展示的此花色或类别的牌。",
			// Warden
			ska_warden: "监守者",
			ska_warden_rt: "Warden",
			ska_zhenhan: "振撼",
			ska_zhenhan_effect: "振撼",
			ska_zhenhan_info: "准备阶段，或带有「赠」标签的牌进入弃牌堆后，你可以指定一名其他角色，若你至其距离大于1，则你本局游戏至其距离-1，否则你令其失去1点体力并复原本技能的距离计算。",
			// Animation vs. Super Mario Bros
			avn_animation_vs_super_mario_bros: "AvSMB",
			// Mario
			sst_mario: "马力欧",
			sst_jueyi: "决意",
			sst_jueyi_info: "锁定技，你使用牌指定目标时，若其手牌数大于你，你摸一张牌，令此牌不可被目标响应。",
			// Animation vs. Math
			avn_animation_vs_math: "Animation vs. Math",
			// Euler’s identity
			avn_euler_identity: "Euler’s identity",
			avn_euler_identity_ab: (() => {
				const sup = document.createElement("sup");
				sup.textContent = "iπ";
				return `e${sup.outerHTML}`;
			})(),
			avn_mathematics: "数术",
			avn_mathematics_rt: "Mathematics",
			get avn_mathematics_backup() {
				return lib.translate.avn_mathematics;
			},
			avn_mathematics_info: "你可以将至少一张点数不为你本回合以此法转化的牌的点数的牌当做任意基本牌或普通锦囊牌使用或打出，且每张以此法转化的牌的点数，你的区域内的牌数，场上的牌数中的三个数可以排列为等差数列或等比数列。",
			// Actual Shorts
			avn_actual_shorts: "Actual Shorts",
			// Kirby
			sst_kirby: "卡比",
			sst_qushi: "取噬",
			sst_qushi_info: "你对一名角色造成伤害后，你可以摸一张牌，或获得该角色的一个没有技能标签的技能直到你受到伤害后。",
			// Corn Dog Guy
			avn_corn_dog_guy: "Corn Dog Guy",
			avn_corn_dog_guy_ab: "CDG",
			avn_rebranding: "品创",
			avn_rebranding_rt: "Rebranding",
			avn_rebranding_info: "每名角色的出牌阶段限一次，其可以赠予你一张牌（若其为你，则改为弃置一张牌）并摸一张牌。当你受到伤害后，你将本技能中的前两个“一张牌”改为“两张牌”，第一个“摸一张牌”改为“获得1点护甲”。",
			get avn_rebranding_rewrite() {
				return `${lib.translate.avn_rebranding}·改`;
			},
			get avn_rebranding_rewrite_rt() {
				return `${lib.translate.avn_rebranding_rt} Rewrite`;
			},
			avn_rebranding_rewrite_info: "每名角色的出牌阶段限一次，其可以赠予你两张牌（若其为你，则改为弃置两张牌）并获得1点护甲。",
			get avn_rebranding_global_info() {
				return `出牌阶段限一次，你可以赠予一名拥有〖${lib.translate.avn_rebranding}〗的角色一张牌（若其为你，则改为弃置一张牌）并摸一张牌，或赠予一名拥有〖${lib.translate.avn_rebranding_rewrite}〗的角色两张牌（若其为你，则改为弃置两张牌）并获得1点护甲。`;
			}
		},
		pinyins: {
			"Alan Becker": ["ˈælən", "ˈbɛkɚ"],
			Victim: ["ˈvɪktəm"],
			"The Chosen One": ["ðə", "ˈtʃoʊzn̩", "ˈwən"],
			"The Dark Lord": ["ðə", "ˈdɑɹk", "ˈlɔɹd"],
			"The Second Coming": ["ðə", "ˈsɛkənd", "ˈkəmɪŋ"],
			Red: ["ˈɹɛd"],
			Yellow: ["ˈjɛloʊ"],
			Green: ["ˈɡɹin"],
			Blue: ["ˈblu"],
			ViraBot: ["ˈvaɪɹəˌbɑt"],
			"[Agent]": ["[ˈeɪdʒənt]"],
			Herobrine: ["ˈhɛɹoʊˌbɹaɪn"],
			Purple: ["ˈpɝpəl"],
			"Dark Blue": ["ˈdɑɹk", "ˈblu"],
			Pink: ["ˈpɪŋk"],
			"King Orange": ["ˈkɪŋ", "ˈɑɹɪndʒ"],
			Gold: ["ˈɡoʊld"],
			Alexcrafter28: ["ˈælɪksˌkɹæftɚˌtwɛntiˌeɪt"],
			"Euler’s identity": ["ˈɔɪlɚz", "aɪˈdɛntəti"],
			"Corn Dog Guy": ["ˈkɔɹn", "ˈdɔɡ", "ˈɡaɪ"],
			马力欧: ["Mario"],
			卡比: ["Kirby"]
		},
		help: {}
	};
	const fileSystemAvailable = Boolean(game.download), availableCharacters = new Set([
		"avn_alan_becker",
		"avn_alexcrafter28",
		"ska_warden",
		"sst_mario",
		"sst_kirby",
		"avn_corn_dog_guy"
	]), unlockedCharacters = lib.config.avn_unlocked_characters;
	Object.entries(animationVsNoname.character).forEach(([key, heroData]) => {
		const exInfo = heroData[4];
		if (fileSystemAvailable) exInfo.push(`ext:桌面大战/image/character/${key}.webp`);
		else exInfo.push(`db:extension-桌面大战:image/character/${key}.webp`);
		exInfo.push("doublegroup:wei:shu:wu:qun:jin");
		if (!availableCharacters.has(key) && !unlockedCharacters?.includes(key)) exInfo.push("unseen");
	});
	Object.values(animationVsNoname.skill).forEach(exSkillData => exSkillData.audio = false);
	return animationVsNoname;
});
