"use strict";
game.import("character", (lib, game, ui, get, ai, _status) => {
	/**
	 * Insert line break opportunities into a URL.
	 * @param {String} url URL
	 */
	const formatURL = url => /* Split the URL into an array to distinguish double slashes from single slashes. */ /* Format the strings on either side of double slashes separately. */ url.split("//").map(str => str.replace(/(?<after>:)/giu, "$1<wbr>").replace(/(?<before>[/~.,\-_?#%])/giu, "<wbr>$1").replace(/(?<beforeAndAfter>[=&])/giu, "<wbr>$1<wbr>")).join("//<wbr>");
	let ordinal = -1;
	/**
	 * @type {importCharacterConfig}
	 */
	const ANIMATION_VS_NONAME = {
		name: "animation_vs_noname",
		connect: true,
		character: {
			avn_alan_becker: ["male", "western", 4, ["avn_animate"], ["border:shu", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_victim: ["male", "western", 4, ["avn_adaptive"], ["border:western", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_the_chosen_one: ["male", "western", 4, ["avn_overflow"], ["border:western", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_the_dark_lord: ["male", "western", 4, ["avn_terminal"], ["border:shu", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_the_second_coming: ["male", "western", 4, ["avn_frame_by_frame_drawing"], ["border:qun", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_the_second_coming_the_chosen_one_return: ["male", "western", 4, ["avn_awakening"], ["border:qun", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_red: ["male", "western", 4, ["avn_combative"], ["border:shu", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_green: ["male", "western", 4, ["avn_progressive"], ["border:wu", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_blue: ["male", "western", 4, ["avn_midas_touch"], ["border:wei", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_yellow: ["male", "western", 4, ["avn_intelligence"], ["border:qun", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_virabot: ["none", "western", 4, ["avn_infection"], ["border:shu", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_agent: ["male", "western", 4, ["avn_surpression"], ["border:western", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_herobrine: ["male", "western", 4, ["avn_out_of_context"], ["border:wei", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_purple: ["male", "western", 4, ["avn_ascending"], ["border:jin", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_dark_blue: ["male", "western", 4, ["avn_ascending"], ["border:wei", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_pink: ["female", "western", 4, ["avn_ascending"], ["border:jin", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_king_orange: ["male", "western", 4, ["avn_resistant"], ["border:qun", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_gold: ["male", "western", 4, ["avn_resistant"], ["border:qun", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_alexcrafter28: ["male", "western", 4, ["avn_encounter"], ["border:wu", "doublegroup:wei:shu:wu:qun:jin"]],
			ska_warden: ["none", "western", "4/10", ["ska_zhenhan"], ["border:wu", "doublegroup:wei:shu:wu:qun:jin"]],
			sst_mario: ["male", "western", 4, ["sst_jueyi"], ["border:shu", "doublegroup:wei:shu:wu:qun:jin"]],
			sst_kirby: ["male", "western", 4, ["sst_qushi"], ["border:shu", "doublegroup:wei:shu:wu:qun:jin"]],
			avn_corn_dog_guy: ["male", "western", 4, ["avn_rebranding"], ["border:qun", "doublegroup:wei:shu:wu:qun:jin"]]
		},
		characterFilter: {},
		characterSort: {
			animation_vs_noname: {
				avn_animator_vs_animation: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one", "avn_the_dark_lord", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_green", "avn_blue", "avn_yellow", "avn_virabot", "avn_agent"],
				avn_animation_vs_minecraft: ["avn_herobrine", "avn_purple", "avn_dark_blue", "avn_pink", "avn_king_orange", "avn_gold", "avn_alexcrafter28", "ska_warden"],
				avn_animation_vs_super_mario_bros: ["sst_mario"],
				avn_actual_shorts: ["sst_kirby"]
			}
		},
		characterIntro: {
			avn_alan_becker: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker、Bradley G. Munkowitz",
				"<hr>",
				`AvN${++ordinal}. Alan Becker<br>`,
				"首次登场：Animator vs. Animation",
				"<hr>",
				"伴随火柴人们一起成长。"
			].join(""),
			avn_victim: [
				"武将作者：Show-K<br>",
				"插图作者：救赎",
				"<hr>",
				`AvN${++ordinal}. Victim<br>`,
				"首次登场：Animator vs. Animation",
				"<hr>",
				"万物起源。"
			].join(""),
			avn_the_chosen_one: [
				"武将作者：Show-K<br>",
				"插图作者：救赎",
				"<hr>",
				`AvN${++ordinal}. The Chosen One<br>`,
				"首次登场：Animator vs. Animation II",
				"<hr>",
				"奋起反抗。"
			].join(""),
			avn_the_dark_lord: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${++ordinal}. The Dark Lord<br>`,
				"首次登场：Animator vs. Animation III",
				"<hr>",
				"“mission.The_Dark_Lord = destroy(The_Chosen_One);”"
			].join(""),
			avn_the_second_coming: [
				"武将作者：Show-K<br>",
				"插图作者：厉眠",
				"<hr>",
				`AvN${++ordinal}. The Second Coming<br>`,
				"首次登场：Animator vs. Animation IV",
				"<hr>",
				"嘿！需要帮忙？"
			].join(""),
			avn_the_second_coming_the_chosen_one_return: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${ordinal}+. The Second Coming<br>`,
				"首次登场：The Showdown - AVA Shorts Episode 4",
				"<hr>",
				`<span style="font-size: 30px; font-weight: bold;">你终结了我的朋友。<br>现在我要终结你。</span>`
			].join(""),
			avn_red: [
				"武将作者：Show-K<br>",
				"插图作者：厉眠",
				"<hr>",
				`AvN${++ordinal}. Red<br>`,
				"首次登场：Animator vs. Animation IV",
				"<hr>",
				"身先士卒。"
			].join(""),
			avn_green: [
				"武将作者：Show-K<br>",
				"插图作者：厉眠",
				"<hr>",
				`AvN${++ordinal}. Green<br>`,
				"首次登场：Animator vs. Animation IV",
				"<hr>",
				"锦上添花。"
			].join(""),
			avn_blue: [
				"武将作者：Show-K<br>",
				"插图作者：厉眠",
				"<hr>",
				`AvN${++ordinal}. Blue<br>`,
				"首次登场：Animator vs. Animation IV",
				"<hr>",
				"雪中送炭。"
			].join(""),
			avn_yellow: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${++ordinal}. Yellow<br>`,
				"首次登场：Animator vs. Animation IV",
				"<hr>",
				"精益求精。"
			].join(""),
			avn_virabot: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${++ordinal}. [Agent]<br>`,
				"首次登场：Wanted - Animator vs. Animation VI - Ep 1",
				"<hr>",
				"突如其来。"
			].join(""),
			avn_agent: [
				"武将作者：Show-K<br>",
				"插图作者：帆",
				"<hr>",
				`AvN${++ordinal}. [Agent]<br>`,
				"首次登场：Wanted - Animator vs. Animation VI - Ep 1",
				"<hr>",
				"一发入魂。"
			].join(""),
			avn_herobrine: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${++ordinal}. Herobrine<br>`,
				"首次登场：Animation vs. Minecraft",
				"<hr>",
				"<del>未</del>已解之谜。"
			].join(""),
			avn_purple: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${++ordinal}. Purple<br>`,
				"首次登场：The Nether - AVM Shorts Episode 8",
				"<hr>",
				["avn_dark_blue", "avn_pink"].some(Set.prototype.has, new Set(game.getExtensionConfig("桌面大战", "unlocked_characters"))) ? "终于得到了认可。" : "努力得到认可。"
			].join(""),
			avn_dark_blue: [
				"武将作者：Show-K<br>",
				"插图作者：林、阿陌",
				"<hr>",
				`AvN${ordinal}-1. Dark Blue<br>`,
				"首次登场：Note Block Universe - AVM Shorts Episode 29",
				"<hr>",
				"再也无法挽留。"
			].join(""),
			avn_pink: [
				"武将作者：Show-K<br>",
				"插图作者：林、阿陌",
				"<hr>",
				`AvN${ordinal}-2. Pink<br>`,
				"首次登场：Note Block Universe - AVM Shorts Episode 29",
				"<hr>",
				"再也无法触及。"
			].join(""),
			avn_king_orange: [
				"武将作者：Show-K<br>",
				"插图作者：救赎",
				"<hr>",
				`AvN${++ordinal}. King Orange<br>`,
				"首次登场：Parkour - AVM Shorts Episode 22",
				"<hr>",
				new Set(game.getExtensionConfig("桌面大战", "unlocked_characters")).has("avn_gold") ? "不想失去任何人了。不能失去任何人了。" : "不想输给任何人了。不能输给任何人了。"
			].join(""),
			avn_gold: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${ordinal}-1. Gold<br>`,
				"首次登场：The King - AVM Shorts Episode 30",
				"<hr>",
				"再也无法陪伴。"
			].join(""),
			avn_alexcrafter28: [
				"联动来源：《大乱桌斗》<br>",
				"武将作者：Show-K、mario not mary<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${++ordinal}. Alexcrafter28<br>`,
				"首次登场：Lush Caves - AVM Shorts Episode 24",
				"<hr>",
				"1428. 史蒂夫/Steve/スティーブ<br>",
				"系列：<ruby>我的世界<rp>（</rp><rt>Minecraft</rt><rp>）</rp></ruby><br>",
				"首次登场：<ruby>我的世界<rp>（</rp><rt>Minecraft</rt><rp>）</rp></ruby><br>",
				"来自一个由立方体构成的世界的神秘人物，身为一名探险家（同时还是一名矿工），他将（和他心爱的镐子）探索这个世界，并与各位斗士们进行一次武艺切磋。<br>",
				"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》",
				"<hr>",
				"这个世界上未曾发生过有人玩Minecraft时突然有两个火柴人从游戏窗口内钻出来到桌面，然后找到邮件程序并把火柴人自己发送出去的事情。"
			].join(""),
			ska_warden: [
				"联动来源：《大乱桌斗》<br>",
				"武将作者：Show-K<br>",
				"插图作者：《我的世界》",
				"<hr>",
				`AvN${++ordinal}. 监守者/Warden/ウォーデン<br>`,
				"首次登场：The Warden - AVM Shorts Episode 26",
				"<hr>",
				"S010. 监守者/Warden/ウォーデン<br>",
				"系列：<ruby>我的世界<rp>（</rp><rt>Minecraft</rt><rp>）</rp></ruby><br>",
				"首次登场：<ruby>我的世界<rp>（</rp><rt>Minecraft</rt><rp>）</rp></ruby><br>",
				"监守者（Warden）是一种高大而危险的敌对生物，会根据振动和气息判断生物的位置。<br>",
				"——《Minecraft Wiki》",
				"<hr>",
				"没有人知道历史。"
			].join(""),
			sst_mario: [
				"联动来源：《大乱桌斗》<br>",
				"武将作者：mario not mary、Show-K<br>",
				"插图作者：黯まめ<br>",
				`——${formatURL("https://twitter.com/kuromame_983/status/601696186274160640")}<br>`,
				"<hr>",
				`AvN${++ordinal}. 马力欧/Mario/マリオ<br>`,
				"首次登场：Animation vs. Super Mario Bros",
				"<hr>",
				"0001. 马力欧/Mario/マリオ<br>",
				"系列：<ruby>马力欧<rp>（</rp><rt>Mario</rt><rp>）</rp></ruby><br>",
				"首次登场：<ruby>咚奇刚<rp>（</rp><rt>Donkey Kong</rt><rp>）</rp></ruby><br>",
				"超级标志性的角色！这位游戏巨星常常从酷霸王手中拯救世界。他有惊人的跳跃能力和多种变身道具。在闲暇时刻，他还会参与体育运动，擅长的项目数也数不清。在大乱斗里，他是一个值得信赖的全能型斗士。让我们一起来说：“是我，马力欧！”<br>",
				"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>",
				"<hr>",
				"太激昂了，太生生不息了。"
			].join(""),
			sst_kirby: [
				"联动来源：《大乱桌斗》<br>",
				"武将作者：mario not mary<br>",
				"插图作者：kotori<br>",
				`——${formatURL("https://www.pixiv.net/artworks/26818738")}<br>`,
				"<hr>",
				`AvN${++ordinal}. 卡比/Kirby/カービィ<br>`,
				"首次登场：Kirby - An Actual Short",
				"<hr>",
				"0323. 卡比/Kirby/カービィ<br>",
				"系列：<ruby>星之卡比<rp>（</rp><rt>Kirby</rt><rp>）</rp></ruby><br>",
				"首次登场：<ruby>星之卡比<rp>（</rp><rt>Kirby\x27s Dream Land</rt><rp>）</rp></ruby><br>",
				"圆圆滚滚的可爱卡比在波普之星过着平静的生活。它可以吸入物品或者生物，并且将它们吐出来或者复制能力。在大乱斗中，卡比吸入斗士之后可以复制他们的通常必杀技。它虽然很容易被击飞，但回场能力还不错。<br>",
				"——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>",
				"<hr>",
				"樱井亲儿子，粉红恶魔，灯火之星。"
			].join(""),
			avn_corn_dog_guy: [
				"武将作者：Show-K<br>",
				"插图作者：Alan Becker",
				"<hr>",
				`AvN${++ordinal}. Corn Dog Guy<br>`,
				"首次登场：Corn Dog Guy - An Actual Short",
				"<hr>",
				"又是不平静的一天。"
			].join("")
		},
		characterTitle: {
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
		},
		perfectPair: {
			avn_victim: ["avn_alan_becker"],
			avn_the_chosen_one: ["avn_alan_becker", "avn_victim"],
			avn_the_dark_lord: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one"],
			avn_the_second_coming: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one", "avn_the_dark_lord"],
			avn_the_second_coming_the_chosen_one_return: ["avn_alan_becker", "avn_victim", "avn_the_chosen_one", "avn_the_dark_lord", "avn_the_second_coming"],
			avn_red: ["avn_alan_becker", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return"],
			avn_green: ["avn_alan_becker", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red"],
			avn_blue: ["avn_alan_becker", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_green"],
			avn_yellow: ["avn_alan_becker", "avn_the_chosen_one", "avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_green", "avn_blue"],
			avn_virabot: ["avn_the_dark_lord"],
			avn_herobrine: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_green", "avn_blue", "avn_yellow"],
			avn_purple: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_green", "avn_blue", "avn_yellow", "avn_herobrine"],
			avn_dark_blue: ["avn_purple"],
			avn_pink: ["avn_purple", "avn_dark_blue"],
			avn_king_orange: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_green", "avn_blue", "avn_yellow", "avn_herobrine", "avn_purple"],
			avn_gold: ["avn_king_orange"],
			ska_warden: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_green", "avn_blue", "avn_yellow", "avn_herobrine", "avn_purple", "avn_king_orange"],
			sst_mario: ["avn_the_second_coming", "avn_the_second_coming_the_chosen_one_return", "avn_red", "avn_green", "avn_blue", "avn_yellow"],
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
					const unlockedCharacters = new Set(game.getExtensionConfig("桌面大战", "unlocked_characters")), getUnlockableAVAIVCharacters = () => [
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
					const characterUnlockMap = new Map([
						["avn_alan_becker", () => {
							if (!unlockedCharacters.has("avn_victim")) return ["avn_victim"];
							if (!unlockedCharacters.has("avn_the_chosen_one")) return ["avn_the_chosen_one"];
							if (!unlockedCharacters.has("avn_the_dark_lord")) return ["avn_the_dark_lord"];
							if (!unlockedCharacters.has("avn_the_second_coming")) return ["avn_the_second_coming"];
							const unlockableAVAIVCharacters = getUnlockableAVAIVCharacters();
							if (unlockableAVAIVCharacters.length) return unlockableAVAIVCharacters;
							return getUnlockableAVAVCharacters();
						}],
						["avn_the_chosen_one", () => {
							if (!unlockedCharacters.has("avn_the_dark_lord")) return ["avn_the_dark_lord"];
							const unlockableAVAVCharacters = getUnlockableAVAVCharacters();
							if (unlockableAVAVCharacters.length) return unlockableAVAVCharacters;
							return getUnlockableAVAVICharacters();
						}],
						["avn_the_dark_lord", getUnlockableAVAVCharacters],
						["avn_the_second_coming", () => {
							const unlockableAVAIVCharacters = getUnlockableAVAIVCharacters();
							if (unlockableAVAIVCharacters.length) return unlockableAVAIVCharacters;
							return getUnlockableCharacters();
						}],
						["avn_red", getUnlockableCharacters],
						["avn_green", getUnlockableCharacters],
						["avn_blue", getUnlockableCharacters],
						["avn_yellow", getUnlockableCharacters],
						["avn_purple", getUnlockableAVMCharacters]
					]);
					[player.name1, player.name2].forEach(value => {
						if (!characterUnlockMap.has(value)) return;
						const unlockableCharacters = characterUnlockMap.get(value)();
						if (!unlockableCharacters.length) return;
						game.saveExtensionConfig("桌面大战", "unlocked_characters", [...unlockedCharacters, ...unlockableCharacters]);
					});
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
					let characterList;
					if (_status.connectMode) characterList = get.charactersOL();
					else characterList = Object.keys(lib.character).filter(value => !lib.filter.characterDisabled(value) && !lib.filter.characterDisabled2(value));
					[...game.players, ...game.dead].forEach(value => {
						characterList.remove(value.name1);
						characterList.remove(value.name2);
					});
					_status.characterlist = characterList;
				},
				/**
				 * @type {ContentFuncByAll}
				 */
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
					const animationVsNonameCharacters = Object.keys(lib.characterPack.animation_vs_noname), toChanges = _status.characterlist.filter(value => {
						if (!animationVsNonameCharacters.includes(value)) return false;
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
					const group = lib.character[toChange]?.[1];
					if (group && player.group != group) player.changeGroup(group, false);
					_status.characterlist.add(name1);
					game.triggerEnter(player);
				},
				/**
				 * @type {ContentFuncByAll}
				 */
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
							const group = lib.character[sourceCharacter]?.[1];
							if (group && player.group != group) player.changeGroup(group, false);
							_status.characterlist.add(name1);
							game.triggerEnter(player);
							game.log(player, "将主将从", `#g${name1}`, "变更为", `#g${sourceCharacter}`);
							name1 = player.name1;
						}
					}
					if (!event.num) event.num = 3;
					_status.characterlist.randomSort();
					const animationVsNonameCharacters = Object.keys(lib.characterPack.animation_vs_noname), toChanges = _status.characterlist.filter(value => {
						if (!animationVsNonameCharacters.includes(value)) return false;
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
				/**
				 * @type {ContentFuncByAll}
				 */
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
							const group = lib.character[sourceCharacter]?.[1];
							if (group && player.group != group) player.changeGroup(group, false);
							_status.characterlist.add(name1);
							game.triggerEnter(player);
							game.log(player, "将主将从", `#g${name1}`, "变更为", `#g${sourceCharacter}`);
							name1 = player.name1;
						}
					}
					if (!event.num) event.num = 3;
					_status.characterlist.randomSort();
					const animationVsNonameCharacters = Object.keys(lib.characterPack.animation_vs_noname), toChanges = _status.characterlist.filter(value => {
						if (!animationVsNonameCharacters.includes(value)) return false;
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
						const hp = player.hp, maxHp = 4 + player.maxHp - get.infoMaxHp(lib.character[player.name1]?.[2]);
						player.init(player.name1, toChange);
						player.maxHp = maxHp;
						player.hp = hp;
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
						if (get.itemtype(targets) == 'player') targets = [targets];
						if (targets[0] != player) return get.translation(targets);
						const selfTargets = targets.slice();
						selfTargets[0] = "自己";
						return get.translation(selfTargets);
					})(target)}发动了【${get.skillTranslation(event.name, player)}】`);
					"step 1"
					player.choosePlayerCard(target, "h", [1, Infinity], `${get.skillTranslation(event.name, player)}：令${get.translation(target)}的任意张手牌均视为${get.translation({
						name: get.name(card),
						nature: get.nature(card)
					})}，直到其使用这些牌中的一张结算或其回合结束后`, true, button => _status.event.player.attitudeTo(_status.event.getParent().target) > 0 ? 5 - get.buttonValue(button) : get.buttonValue(button));
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
				hiddenCard: (player, name) => !player.getStat("skill").avn_adaptive && player.countCards("hes") && game.getAllGlobalHistory("useCard", evt => ["basic", "trick"].includes(get.type(evt.card, null, false))).pop()?.card.name == name,
				locked: false,
				enable: "chooseToUse",
				usable: 1,
				onChooseToUse: event => {
					if (!game.online && !Array.isArray(event.lastUsedBasicOrCommonTrickCard)) event.set("lastUsedBasicOrCommonTrickCard", game.getAllGlobalHistory("useCard", evt => ["basic", "trick"].includes(get.type(evt.card, null, false))).pop()?.card);
				},
				filter: (event, player) => {
					if (!player.countCards("hes")) return false;
					const viewAs = lib.skill.avn_adaptive.viewAs();
					return viewAs && event.filterCard(viewAs, player, event);
				},
				position: "hes",
				filterCard: true,
				viewAs: () => {
					const lastUsedBasicOrCommonTrickCard = _status.event.lastUsedBasicOrCommonTrickCard;
					return typeof lastUsedBasicOrCommonTrickCard == "object" ? {
						name: lastUsedBasicOrCommonTrickCard.name,
						nature: lastUsedBasicOrCommonTrickCard.nature,
						storage: {
							avn_adaptive: true
						}
					} : null;
				},
				popname: true,
				prompt: () => `每回合限一次，你可以将一张牌当做${get.translation(lib.skill.avn_adaptive.viewAs())}使用（无距离和次数限制），若如此做，且你的手牌数为全场最少，你摸一张牌`,
				check: card => 7 - get.value(card),
				onuse: () => _status.event.oncard = (card, player) => {
					const useCardFinish = game.createEvent("useCardFinish");
					_status.event.next.remove(useCardFinish);
					_status.event.after.push(useCardFinish);
					useCardFinish.player = player;
					useCardFinish.setContent(() => {
						if (player.isMinHandcard()) player.draw();
					});
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
					skillTagFilter: (player, tag, arg) => {
						if (arg != "use") return false;
						if (player.getStat("skill").avn_adaptive) return false;
						if (!player.countCards("hes")) return false;
						const lastUsedBasicOrCommonTrickCard = game.getAllGlobalHistory("useCard", evt => ["basic", "trick"].includes(get.type(evt.card, null, false))).pop()?.card;
						if (typeof lastUsedBasicOrCommonTrickCard != "object") return false;
						switch (tag) {
							case "fireAttack":
								if (lastUsedBasicOrCommonTrickCard.name != "huogong") return false;
								break;
							case "respondSha":
								if (lastUsedBasicOrCommonTrickCard.name != "sha") return false;
								break;
							case "respondShan":
								if (lastUsedBasicOrCommonTrickCard.name != "shan") return false;
								break;
							case "respondTao":
								if (lastUsedBasicOrCommonTrickCard.name != "tao") return false;
								break;
							case "save": if (!get.tag(lastUsedBasicOrCommonTrickCard, "save")) return false;
						}
					},
					order: () => {
						const lastUsedBasicOrCommonTrickCard = game.getAllGlobalHistory("useCard", evt => ["basic", "trick"].includes(get.type(evt.card, null, false))).pop()?.card;
						return typeof lastUsedBasicOrCommonTrickCard == "object" ? get.order({
							name: lastUsedBasicOrCommonTrickCard.name,
							nature: lastUsedBasicOrCommonTrickCard.nature,
							storage: {
								avn_adaptive: true
							}
						}) - 0.1 : 10;
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
							if (get.itemtype(targets) == 'player') targets = [targets];
							if (targets[0] != player) return get.translation(targets);
							const selfTargets = targets.slice();
							selfTargets[0] = "自己";
							return get.translation(selfTargets);
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
					const delayx = game.createEvent("delayx");
					event.next.remove(delayx);
					target.damage(result.control, "nocard").after.push(delayx);
					delayx.setContent(() => {
						game.delayx();
					});
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
							if (get.itemtype(targets) == 'player') targets = [targets];
							if (targets[0] != player) return get.translation(targets);
							const selfTargets = targets.slice();
							selfTargets[0] = "自己";
							return get.translation(selfTargets);
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
				hiddenCard: (player, name) => {
					if (!player.hasCard(card => !player.hasHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup" && get.suit(card) == evt.event.card.suit) && !(get.number(card) < player.getHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup").pop()?.event.card.number), "hes")) return false;
					if (!["basic", "trick"].includes(get.type(name))) return false;
					return Array.from(ui.discardPile.childNodes).slice(-5).some(value => {
						if (!player.hasCard(card => get.type2(value) != get.type2(card), "hes")) return false;
						const discardPileCardName = get.name(value);
						return lib.skill.avn_frame_by_frame_drawing.hasNotConvertedThisRound(player, discardPileCardName) && discardPileCardName == name;
					});
				},
				enable: ["chooseToUse", "chooseToRespond"],
				filter: (event, player) => player.hasCard(card => !player.hasHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup" && get.suit(card) == evt.event.card.suit) && !(get.number(card) < player.getHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup").pop()?.event.card.number), "hes") && Array.from(ui.discardPile.childNodes).slice(-5).some(value => {
					if (!player.hasCard(card => !(get.number(card) < player.getHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup").pop()?.event.card.number) && get.type2(value) != get.type2(card), "hes")) return false;
					const virtualCard = {
						name: get.name(value),
						nature: get.nature(value)
					};
					return ["basic", "trick"].includes(get.type(virtualCard, null, false)) && lib.skill.avn_frame_by_frame_drawing.hasNotConvertedThisRound(player, virtualCard.name) && event.filterCard(virtualCard, player, event);
				}),
				chooseButton: {
					dialog: (event, player) => ui.create.dialog(get.skillTranslation("avn_frame_by_frame_drawing", player), Array.from(ui.discardPile.childNodes).slice(-5)),
					filter: (button, player) => {
						if (!player.hasCard(card => get.type2(button.link) != get.type2(card), "hes")) return false;
						const virtualCard = {
							name: get.name(button.link),
							nature: get.nature(button.link)
						};
						if (!["basic", "trick"].includes(get.type(virtualCard, null, false)) || !lib.skill.avn_frame_by_frame_drawing.hasNotConvertedThisRound(player, virtualCard.name)) return false;
						const parent = _status.event.getParent();
						return parent.filterCard(virtualCard, player, parent);
					},
					check: button => {
						if (_status.event.getParent().type != "phase") return 1;
						if (["wugu", "zhulu_card", "yiyi", "lulitongxin", "lianjunshengyan", "diaohulishan"].contains(get.name(button.link))) return 0;
						return _status.event.player.getUseValue({
							name: get.name(button.link),
							nature: get.nature(button.link)
						});
					},
					backup: links => ({
						position: "hes",
						filterCard: (card, player) => get.type2(lib.skill.avn_frame_by_frame_drawing_backup.viewAs) != get.type2(card) && !player.hasHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup" && get.suit(card) == evt.event.card.suit) && !(get.number(card) < player.getHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup").pop()?.event.card.number),
						viewAs: {
							name: get.name(links[0]),
							nature: get.nature(links[0])
						},
						popname: true,
						check: card => 8 - get.value(card)
					}),
					prompt: links => `将一张牌当做${get.translation({
						name: get.name(links[0]),
						nature: get.nature(links[0])
					})}使用或打出`
				},
				/**
				 * @param {Player} player Player
				 * @param {string} name Card name
				 * @returns {boolean}
				 */
				hasNotConvertedThisRound: (player, name) => {
					for (const actionHistory of player.actionHistory.slice().reverse()) {
						if (actionHistory.useSkill.some(value => value.skill == "avn_frame_by_frame_drawing_backup" && name == value.event.card.name)) return false;
						if (actionHistory.isRound) break;
					}
					return true;
				},
				ai: {
					fireAttack: true,
					respondSha: true,
					respondShan: true,
					respondTao: true,
					save: true,
					skillTagFilter: (player, tag) => {
						if (!player.hasCard(card => !player.hasHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup" && get.suit(card) == evt.event.card.suit) && !(get.number(card) < player.getHistory("useSkill", evt => evt.skill == "avn_frame_by_frame_drawing_backup").pop()?.event.card.number), "hes")) return false;
						if (Array.from(ui.discardPile.childNodes).slice(-5).some(value => {
							if (!player.hasCard(card => get.type2(value) != get.type2(card), "hes")) return false;
							const virtualCard = {
								name: get.name(value),
								nature: get.nature(value)
							};
							if (!["basic", "trick"].includes(get.type(virtualCard, null, false))) return false;
							const virtualCardName = virtualCard.name;
							if (!lib.skill.avn_frame_by_frame_drawing.hasNotConvertedThisRound(player, virtualCardName)) return false;
							switch (tag) {
								case "fireAttack": return virtualCardName == "huogong";
								case "respondSha": return virtualCardName == "sha";
								case "respondShan": return virtualCardName == "shan";
								case "respondTao": return virtualCardName == "tao";
								case "save": return get.tag(value, "save");
							}
							return false;
						})) return false;
					},
					order: 10,
					result: {
						player: player => _status.event.dying ? player.attitudeTo(_status.event.dying) : 1
					}
				}
			},
			avn_frame_by_frame_drawing_backup: {},
			avn_awaking: {
				charlotte: true,
				init: (player, skill) => {
					if (player.storage[skill]) return;
					player.storage[skill] = 1;
					game.broadcastAll(player => {
						player.nodying = true;
						ui.window.addEventListener("animationend", ev => {
							if (ev.animationName == "avn-pulse" || ev.animationName == "avn-strong-pulse") ui.window.classList.remove(ev.animationName);
						});
						setTimeout(() => new Image().src = `${lib.assetURL}extension/桌面大战/image/background/avn_the_second_coming_the_chosen_one_return_bg.webp`, 1000);
					}, player);
				},
				forced: true,
				trigger: {
					global: "phaseZhunbeiBegin"
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					"step 0"
					const playerNames = [player.name1, player.name2];
					if (player.storage[event.name] == 1 && trigger.player == player && playerNames.includes("avn_the_second_coming")) {
						game.broadcastAll(player => {
							ui.backgroundMusic.removeEventListener("ended", game.playBackgroundMusic);
							game.playBackgroundMusic = () => {
								if (lib.config.background_music == "music_off") ui.backgroundMusic.src = "";
								else ui.backgroundMusic.src = `${lib.assetURL}extension/桌面大战/audio/background/music_arrival.opus`;
							};
							ui.backgroundMusic.addEventListener("ended", game.playBackgroundMusic);
							const preAwaking = document.getElementById("avn-pre-awaking");
							if (preAwaking) {
								preAwaking.style.transitionDuration = "1s";
								preAwaking.style.boxShadow = "inset 0 0 200px 400px #d8eec2";
								preAwaking.style.opacity = "1";
								setTimeout(preAwaking => {
									_status._aozhan = true;
									game.playBackgroundMusic();
									ui.background.setBackgroundImage(`extension/桌面大战/image/background/avn_the_second_coming_the_chosen_one_return_bg.webp`);
									preAwaking.style.boxShadow = "inset 0 0 200px 200px #d8eec2";
									preAwaking.style.opacity = "0";
								}, 1000, preAwaking);
							}
							else setTimeout(() => {
								_status._aozhan = true;
								game.playBackgroundMusic();
								ui.background.setBackgroundImage(`extension/桌面大战/image/background/avn_the_second_coming_the_chosen_one_return_bg.webp`);
							}, 1000);
							if (player.showIdentity) player.showIdentity();
						}, player);
						player.storage[event.name] = 2;
						playerNames.forEach(value => {
							if (value != "avn_the_second_coming") return;
							player.reinit(value, "avn_the_second_coming_the_chosen_one_return", false);
							game.triggerEnter(player);
						});
						return;
					}
					if (player.hp < player.maxHp) {
						player.recover()._triggered = null;
						player.draw()._triggered = null;
					}
					event.finish();
					"step 1"
					const damagedHp = player.maxHp - player.hp;
					if (damagedHp > 0) {
						player.recover(damagedHp)._triggered = null;
						player.draw(damagedHp)._triggered = null;
					}
					game.broadcastAll(player => delete player.nodying, player);
					lib.onover.push(resultbool => {
						if (resultbool) game.filterPlayer2(current => current.isUnderControl(true) && [current.name1, current.name2].includes("avn_the_second_coming_the_chosen_one_return")).forEach(value => game.filterPlayer2(current => {
							game.getExtensionConfig("桌面大战", "unlocked_characters").add("avn_the_second_coming_the_chosen_one_return");
							game.saveExtensionConfig("桌面大战", "unlocked_characters", game.getExtensionConfig("桌面大战", "unlocked_characters"));
							if (current.isIn() || !current.isFriendsOf(value) && !value.isFriendsOf(current)) return;
							value.line(current, "green");
							game.broadcastAll(current => {
								current.in();
								if (current.isDead()) current.revive(current.maxHp);
							}, current);
						}));
					});
				}
			},
			_avn_awaking_check: {
				ruleSkill: true,
				forced: true,
				trigger: {
					player: "changeHp"
				},
				filter: (event, player) => {
					if (game.getExtensionConfig("桌面大战", "unlocked_characters").includes("avn_the_second_coming_the_chosen_one_return")) return false;
					if (player.storage.avn_awaking) return false;
					if (event.num > 0) return false;
					if (![player.name1, player.name2].includes("avn_the_second_coming")) return false;
					const friends = game.filterPlayer2(current => current.isFriendsOf(player) || player.isFriendsOf(current)), inGameFriends = friends.filter(value => value.isIn());
					return inGameFriends.length < friends.length && inGameFriends.every(value => [value.name1, value.name2].includes("avn_the_second_coming"));
				},
				content: (event, step, source, player) => {
					if (!player.storage.avn_pre_awaking) {
						player.storage.avn_pre_awaking = true;
						game.broadcastAll(() => {
							const preAwaking = document.createElement("div");
							document.body.appendChild(preAwaking);
							preAwaking.id = "avn-pre-awaking";
							setTimeout(preAwaking => preAwaking.style.opacity = "0.5", 1000, preAwaking);
						});
					}
					if (player.hp <= 0) player.addSkill("avn_awaking");
				}
			},
			_avn_awaking_effect: {
				ruleSkill: true,
				forced: true,
				trigger: {
					global: "changeHp"
				},
				filter: event => {
					if (game.getExtensionConfig("桌面大战", "unlocked_characters").includes("avn_the_second_coming_the_chosen_one_return")) return false;
					const evt = event.getParent();
					switch (evt.name) {
						case "damage": return evt.player && evt.player.storage.avn_awaking || evt.source && evt.source.storage.avn_awaking;
						case "loseHp":
							if (evt.player && evt.player.storage.avn_awaking) return true;
							return evt.getParent()?.player.storage.avn_awaking;
					}
					return false;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger) => {
					if (trigger.num < -1) game.broadcastAll(() => ui.window.classList.add("avn-strong-pulse"));
					else game.broadcastAll(() => ui.window.classList.add("avn-pulse"));
				}
			},
			// The Second Coming (The Chosen One"s Return)
			avn_awakening: {
				delay: false,
				enable: "phaseUse",
				usable: 1,
				filterTarget: true,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.showCards(target.getCards("h"), `${get.translation(player)}对${(targets => {
						if (get.itemtype(targets) == 'player') targets = [targets];
						if (targets[0] != player) return get.translation(targets);
						const selfTargets = targets.slice();
						selfTargets[0] = "自己";
						return get.translation(selfTargets);
					})(target)}发动了【${get.skillTranslation(event.name, player)}】`);
					"step 1"
					const controls = ["选项二", "cancel2"], numberOfBlackCards = target.countCards("h", {
						color: "black"
					}), choiceList = [`令${get.translation(target)}${numberOfBlackCards ? `摸${get.cnNumber(numberOfBlackCards)}张牌，然后` : ""}失去1点体力`], firstControl = [], redCards = target.getCards("h", card => lib.filter.cardDiscardable(card, target) && get.color(card) == "red");
					if (redCards.length) firstControl.push(`弃置${get.translation(redCards)}`);
					if (target.hp < target.maxHp) firstControl.push("回复1点体力");
					if (firstControl.length) {
						controls.unshift("选项一");
						choiceList.unshift(`令${get.translation(target)}${firstControl.join("，然后")}`);
					}
					else choiceList.unshift(`<span style="opacity: 0.5;">此选项不可用</span>`);
					player.chooseControl(...controls, (event, player) => {
						const choices = _status.event.controls.filter(value => {
							if (value != "选项一" && value != "选项二") return false;
							const target = event.target, attitude = player.attitudeTo(target), squareRootOfAttitude = (attitude < 0 ? -Math.sqrt(-attitude) : Math.sqrt(attitude));
							if (value == "选项一") {
								const valueOfRedCards = target.getCards("h", card => lib.filter.cardDiscardable(card, target) && get.color(card) == "red").reduce((previousValue, currentValue) => previousValue + get.value(currentValue, target), 0);
								let effect = -squareRootOfAttitude * (valueOfRedCards < 0 ? -Math.sqrt(-valueOfRedCards) : Math.sqrt(valueOfRedCards));
								if (target.hasSkillTag("noh")) effect *= 3;
								return effect + get.recoverEffect(target, player, player) > 0;
							}
							const numberOfBlackCards = target.countCards("h", {
								color: "black"
							});
							let effect = squareRootOfAttitude * numberOfBlackCards * 0.75;
							if (numberOfBlackCards && target.hasSkillTag("nogain")) effect /= 10;
							return effect + get.effect(target, {
								name: "losehp"
							}, player, player) > 0;
						});
						if (choices.length) return choices.randomGet();
						return "cancel2";
					}).set("choiceList", choiceList).prompt = `${get.skillTranslation(event.name, player)}：你可以选择一项`;
					"step 2"
					switch (result.control) {
						case "选项一":
							const redCards = target.getCards("h", card => lib.filter.cardDiscardable(card, target) && get.color(card) == "red");
							if (redCards.length) target.discard(redCards);
							if (target.hp < target.maxHp) {
								const delayx = game.createEvent("delayx");
								event.next.remove(delayx);
								target.recover().after.push(delayx);
								delayx.setContent(() => {
									game.delayx();
								});
							}
							break;
						case "选项二":
							const lengthOfBlackCards = target.countCards("h", {
								color: "black"
							});
							if (lengthOfBlackCards) target.draw(lengthOfBlackCards);
							const delayx = game.createEvent("delayx");
							event.next.remove(delayx);
							target.loseHp().after.push(delayx);
							delayx.setContent(() => {
								game.delayx();
							});
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
							player.chooseCardButton(`${get.skillTranslation(event.name, player)}：将任意张牌交给${get.translation(target)}`, true, [1, Infinity], player.getCards("x", card => lib.filter.canBeGained(card, target, player))).set("filterButton", (button, player) => lib.filter.canBeGained(button.link, _status.event.getParent().target, player)).ai = button => {
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
					if (result.links?.length) event.chooseUseTarget = player.chooseUseTarget(event.chosenCards.addArray(result.links)[0]);
					else event.finish();
					"step 5"
					if (!player.hasHistory("useCard", evt => evt.getParent() == event.chooseUseTarget)) event.goto(3);
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
						target.chooseToDiscard(`${get.skillTranslation(event.name, player)}：弃置一张牌`, "he", true).delay = false;
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
				filter: (event, player) => player.getHistory("useCard").length,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					player.showCards(event.cards = game.cardsGotoOrdering(get.cards(event.num = new Set(player.getHistory("useCard", evt => get.type2(evt.card)).map(value => get.type2(value.card))).size)).cards, `${get.translation(player)}发动了【${get.skillTranslation(event.name, player)}】`);
					"step 1"
					if (cards.length) player.chooseTarget([1, event.num], `${get.skillTranslation(event.name, player)}：指定至多${get.cnNumber(event.num)}名角色，这些角色可以依次获得${get.translation(cards)}${cards.length > 1 ? "中的一张牌" : ""}`).ai = target => {
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
						if (get.itemtype(targets) == 'player') targets = [targets];
						if (targets[0] != player) return get.translation(targets);
						const selfTargets = targets.slice();
						selfTargets[0] = "自己";
						return get.translation(selfTargets);
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
						event.next.remove(uiClear);
						event.next.remove(loseFinish);
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
							player.addTempSkill(name, {
								player: `${name}Begin`
							});
							player.storage[name].push(num);
						});
						const phase = event.getParent("phase");
						if (!phase) return;
						const avnOutOfContextFinish = game.createEvent("avnOutOfContextFinish");
						event.next.remove(avnOutOfContextFinish);
						phase.after.push(avnOutOfContextFinish);
						avnOutOfContextFinish.player = player;
						loseFinish.skill = event.name;
						avnOutOfContextFinish.setContent(() => {
							delete player.storage[`${skill}_effect`];
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
				init: (player, skill) => {
					if (!player.storage.renku) player.storage.renku = true;
					if (!Array.isArray(player.storage[skill])) player.storage[skill] = [];
				},
				direct: true,
				trigger: {
					global: "phaseAfter"
				},
				filter: (event, player) => player.storage.avn_out_of_context_effect.length && _status.renku.filter(value => game.hasPlayer(current => lib.filter.canBeGained(value, current, player))).length,
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const numberOfRenkuCardsGivable = _status.renku.filter(value => game.hasPlayer(current => lib.filter.canBeGained(value, current, player))).length;
					if (numberOfRenkuCardsGivable && player.storage[event.name].length) {
						const numberOfRenkuCardsToGive = Math.min(numberOfRenkuCardsGivable, event.num = player.storage[event.name].shift());
						player.chooseTarget(`${get.skillTranslation(event.name, player)}：将仁库中的${get.cnNumber(numberOfRenkuCardsToGive)}张牌交给一名角色`, true, (card, player, target) => _status.renku.filter(value => lib.filter.canBeGained(value, target, player)).length >= _status.event.numberOfRenkuCardsToGive, target => Math.max(..._status.renku.filter(value => game.hasPlayer(current => lib.filter.canBeGained(value, current, player))).map(value => get.sgnAttitude(_status.event.player, target) * get.value(value, target)))).numberOfRenkuCardsToGive = numberOfRenkuCardsToGive;
					}
					else event.finish();
					"step 1"
					if (result.targets?.length) {
						const target = event.target = result.targets[0];
						player.logSkill(event.name, target);
						const numberOfCardsNeedToGive = Math.min(_status.renku.filter(value => game.hasPlayer(current => lib.filter.canBeGained(value, current, player))).length, num);
						player.chooseCardButton(`${get.skillTranslation(event.name, player)}：将仁库中的${get.cnNumber(numberOfCardsNeedToGive)}张牌交给${get.translation(target)}`, true, [1, numberOfCardsNeedToGive], _status.renku).set("filterButton", (button, player) => lib.filter.canBeGained(button.link, _status.event.getParent().target, player)).ai = button => {
							const target = _status.event.getParent().target;
							return _status.event.player.attitudeTo(target) * get.value(button.link, target);
						};
					}
					else event.finish();
					"step 2"
					if (result.links?.length) {
						_status.renku.removeArray(result.links);
						game.updateRenku();
						player.$give(result.links, target);
						player.give(result.links, target, true).set("fromStorage", true).fromRenku = true;
						if (target != player) player.addExpose(0.2);
					}
					event.goto(0);
				}
			},
			// Purple, Dark Blue, Pink
			avn_ascending: {
				get derivation() {
					const unlockedCharacters = game.getExtensionConfig("桌面大战", "unlocked_characters");
					if (unlockedCharacters.includes("avn_dark_blue") || unlockedCharacters.includes("avn_pink")) return "avn_ascending_rewrite";
				},
				intro: {
					content: (storage, player) => get.skillInfoTranslation("avn_ascending", player)
				},
				mod: {
					aiOrder: (player, card, num) => {
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
					return !player.hasHistory("useSkill", evt => evt.skill == "avn_ascending" && evt.event[player.storage.avn_ascending ? "discardedAnyPlayerCards" : "discardedCards"]) && player.getHistory("useCard").length > 1;
				},
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					if (event.triggername == "washCard") {
						const name = event.name;
						player.logSkill(name);
						player.trySkillAnimate(`${name}_rewrite`, name, player.checkShow(name));
						const unlockedCharacters = new Set(game.getExtensionConfig("桌面大战", "unlocked_characters"));
						if (!unlockedCharacters.has("avn_dark_blue") || !unlockedCharacters.has("avn_pink")) {
							unlockedCharacters.add("avn_dark_blue");
							unlockedCharacters.add("avn_pink");
							game.saveExtensionConfig("桌面大战", "unlocked_characters", Array.from(unlockedCharacters));
						}
						player.storage[name] = true;
						player.markSkill(name);
						game.log(player, "修改了技能", `#g【${get.skillTranslation(name, player)}】`);
						event.finish();
						return;
					}
					event.isStrictlyIncreasing = player.getHistory("useCard").map(value => value.card.number).every((value, index, array) => !index || value > array[index - 1]);
					if (!player.storage[event.name]) {
						if (event.isStrictlyIncreasing) {
							player.logSkill(event.name);
							player.draw("nodelay");
						}
						else if ((event.num = player.getHp()) && player.hasCard(card => lib.filter.cardDiscardable(card, player), "he")) {
							player.logSkill(event.name);
							player.chooseToDiscard(`${get.skillTranslation(event.name, player)}：弃置${get.cnNumber(event.num)}张牌`, "he", event.num, true).delay = false;
							event.discardedCards = true;
						}
						event.finish();
						return;
					}
					if (event.isStrictlyIncreasing) player.chooseTarget(`${get.skillTranslation(event.name, player)}：令一名角色摸一张牌`, true).set("targetprompt", "摸一张牌").ai = target => {
						const effect = _status.event.player.attitudeTo(target);
						if (target.hasSkillTag("nogain")) return effect / 10;
						return effect;
					};
					else if ((event.num = player.getHp()) && game.hasPlayer(current => current.countDiscardableCards(player, "he"))) player.chooseTarget(`${get.skillTranslation(event.name, player)}：弃置一名角色的至多${get.cnNumber(event.num)}张牌`, true, (card, player, target) => target.countDiscardableCards(player, "he")).set("targetprompt", "被弃置牌").ai = target => get.effect(target, "guohe_copy2", _status.event.player, _status.event.player);
					else event.finish();
					"step 1"
					if (!result.targets?.length) return;
					player.logSkill(event.name, event.target = result.targets[0]);
					if (event.target != player) player.addExpose(0.2);
					if (event.isStrictlyIncreasing) event.target.draw("nodelay");
					else {
						player.discardPlayerCard(event.target, "he", [1, event.num], `${get.skillTranslation(event.name, player)}：弃置${get.translation(event.target)}的至多${get.cnNumber(event.num)}张牌`, true);
						event.discardedAnyPlayerCards = true;
					}
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
					if (game.getExtensionConfig("桌面大战", "unlocked_characters").includes("avn_gold")) return "avn_resistant_rewrite";
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
				filter: (event, player, name) => name == "washCard" || !player.hasHistory("useSkill", evt => evt.skill == "avn_resistant" && evt.event.triggername != "washCard"),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const name = event.name;
					if (event.triggername == "washCard") {
						player.logSkill(name);
						player.trySkillAnimate(`${name}_rewrite`, name, player.checkShow(name));
						const unlockedCharacters = new Set(game.getExtensionConfig("桌面大战", "unlocked_characters"));
						if (!unlockedCharacters.has("avn_gold")) {
							unlockedCharacters.add("avn_gold");
							game.saveExtensionConfig("桌面大战", "unlocked_characters", Array.from(unlockedCharacters));
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
						const numberOfKCards = bottomCards.filter(value => get.number(value) == 13).length;
						player.showCards(bottomCards);
						player.gain(bottomCards, "gain2");
						if (numberOfKCards) player.gain(get.bottomCards(numberOfKCards), "gain2");
						event.finish();
						return;
					}
					player.chooseTarget(`${get.skillTranslation(name, player)}：令一名角色亮出并获得牌堆底的${get.cnNumber(Math.max(player.getDamagedHp(), 1))}张牌，然后这些牌中每有一张点数为K的牌，其获得牌堆底的一张牌`, true).ai = target => {
						const player = _status.event.player, sgnAttitude = get.sgnAttitude(player, target);
						if (!sgnAttitude) return 0;
						let effect = sgnAttitude * Math.max(player.getDamagedHp(), 1);
						if (target.hasSkillTag("nogain")) effect /= 10;
						return effect;
					}
					"step 1"
					if (!result.targets?.length) return;
					player.logSkill(event.name, event.target = result.targets[0]);
					if (event.target != player) player.addExpose(0.2);
					const bottomCards = game.cardsGotoOrdering(get.bottomCards(Math.max(player.getDamagedHp(), 1))).cards;
					const numberOfKCards = bottomCards.filter(value => get.number(value) == 13).length;
					event.target.showCards(bottomCards);
					event.target.gain(bottomCards, "gain2");
					if (numberOfKCards) event.target.gain(get.bottomCards(numberOfKCards), "gain2");
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					skillTagFilter: player => {
						if (player.hasHistory("useSkill", evt => evt.skill == "avn_resistant" && evt.event.triggername != "washCard")) return false;
					},
					effect: {
						target: (card, player, target) => {
							if (target.hasHistory("useSkill", evt => evt.skill == "avn_resistant" && evt.event.triggername != "washCard") || !get.tag(card, "damage")) return;
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
			// Alexcrafter28
			avn_encounter: {
				enable: "phaseUse",
				usable: 1,
				filter: (event, player) => player.hasCard(card => lib.filter.cardDiscardable(card, player), "he"),
				position: "he",
				filterCard: true,
				check: card => 6 - get.useful(card),
				content: (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) => {
					"step 0"
					const topCardsOfCardPile = event.cards = get.cards(10);
					topCardsOfCardPile.forEach(value => ui.cardPile.insertBefore(value, ui.cardPile.firstChild));
					game.updateRoundNumber();
					player.showCards(topCardsOfCardPile, `${get.translation(player)}发动了【${get.skillTranslation(event.name, player)}】`);
					"step 1"
					player.chooseCardButton(`${get.skillTranslation(event.name, player)}：你可以获得${get.translation(cards)}${cards.length > 1 ? "中的一张牌" : ""}`, cards).ai = button => _status.event.player.getUseValue(button.link, true, true);
					"step 2"
					if (result.links?.length) player.gain(result.links, "gain2");
				},
				ai: {
					order: 6,
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
					player.chooseTarget(get.prompt2("ska_zhenhan"), lib.filter.notMe, target => get.distance(_status.event.player, target) > 1 ? -_status.event.player.attitudeTo(target) : get.effect(target, {
						name: "losehp"
					})).targetprompt = target => get.distance(_status.event.player, target) > 1 ? "距离-1" : "失去体力";
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
				global: "avn_rebranding_global",
				subSkill: {
					global: {
						enable: "phaseUse",
						usable: 1,
						position: "he",
						filterCard: (card, player) => game.hasPlayer(current => current.hasSkill("avn_rebranding") && (current == player ? lib.filter.cardDiscardable(card, player) : game.checkMod)),
					}
				}
			}
		},
		dynamicTranslate: {
			avn_surpression: player => `${lib.translate.avn_surpression_info_head}${lib.skill.avn_surpression.convertableCards.reduce((previousValue, currentValue, currentIndex) => {
				const translation = `${String.fromCharCode(9312 + currentIndex)}【${get.translation(currentValue)}】`;
				return currentIndex == player.countMark("avn_surpression") % 4 ? `${previousValue}<span class="bluetext">${translation}</span>` : `${previousValue}${translation}`;
			}, "")}${lib.translate.avn_surpression_info_tail}`,
			avn_ascending: player => player.storage.avn_ascending ? lib.translate.avn_ascending_rewrite_info : lib.translate.avn_ascending_info,
			avn_resistant: player => player.storage.avn_resistant ? lib.translate.avn_resistant_rewrite_info : lib.translate.avn_resistant_info
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
			get avn_animate_effect() {
				return this.avn_animate;
			},
			avn_animate_info: "出牌阶段限一次，你可以展示一张基本牌或普通锦囊牌，令一名角色的任意张手牌均视为此牌，直到其使用这些牌中的一张结算后或其回合结束后。",
			// Victim
			avn_victim: "Victim",
			avn_adaptive: "应识",
			avn_adaptive_info: "每回合限一次，你可以将一张牌当做上一张被使用的基本牌或普通锦囊牌使用（无距离和次数限制），若如此做，且你的手牌数为全场最少，你摸一张牌。",
			// The Chosen One
			avn_the_chosen_one: "The Chosen One",
			avn_the_chosen_one_ab: "Chosen",
			avn_overflow: "超限",
			avn_overflow_info: "出牌阶段开始时，你可以展示所有手牌并弃置一种花色的所有手牌（至少一张），对一名角色造成1点属性伤害，然后你可以将弃置的牌中的一张赠予一名手牌数不大于你的其他角色。",
			// The Dark Lord
			avn_the_dark_lord: "The Dark Lord",
			avn_the_dark_lord_ab: "Dark",
			avn_terminal: "终解",
			avn_terminal_info: "出牌阶段结束时，你可以展示一名角色的所有手牌，然后你可以删除其中的一种花色的所有牌。",
			// The Second Coming
			avn_the_second_coming: "The Second Coming",
			avn_the_second_coming_ab: "Second",
			avn_frame_by_frame_drawing: "逐绘",
			get avn_frame_by_frame_drawing_backup() {
				return this.avn_frame_by_frame_drawing;
			},
			avn_frame_by_frame_drawing_info: "每回合每种花色限一次，你可以将一张牌当做最后进入弃牌堆的五张牌中的一张与其类别不同，且你本轮未以此法转化过的基本牌或普通锦囊牌使用或打出，且被转化的牌的点数不小于你本回合上一张以此法转化的牌。",
			// The Second Coming (The Chosen One's Return)
			get avn_the_second_coming_the_chosen_one_return() {
				return this.avn_the_second_coming;
			},
			get avn_the_second_coming_the_chosen_one_return_ab() {
				return this.avn_the_second_coming_ab;
			},
			avn_awakening: "决唤",
			avn_awakening_info: "出牌阶段限一次，你可以展示一名角色的所有手牌，然后你可以选择一项：1. 令其弃置其所有红色手牌，然后回复1点体力；2. 令其摸其黑色手牌数张牌，然后失去1点体力。",
			// Red
			avn_red: "Red",
			avn_combative: "攻端",
			avn_combative_info: "当有牌被抵消后，你可以使用牌堆顶的一张牌与一名角色拼点，若你赢，则你可以使用一张拼点牌，否则你将你的区域内的一张牌置于武将牌上。当你造成伤害后，你可以将武将牌上的任意张牌交给一名角色。",
			// Green
			avn_green: "Green",
			avn_progressive: "筑韵",
			avn_progressive_info: "当你于一回合内首次使用一种花色的牌时，你可以令一名角色摸一张牌并弃置一张牌，然后你本回合检测本技能发动合法性时视为你本回合使用的花色为此弃置的牌的牌数-1。",
			// Blue
			avn_blue: "Blue",
			avn_midas_touch: "点金",
			avn_midas_touch_info: "每名角色的结束阶段，若你本回合使用过牌，则你可以亮出牌堆顶的你本回合使用的牌的类别数张牌，然后指定至多等量角色，这些角色依次可以获得一张亮出的牌。",
			// Yellow
			avn_yellow: "Yellow",
			avn_intelligence: "机能",
			avn_intelligence_info: "每名角色的回合结束时，若此回合不为额外回合，且你本回合使用过的牌的名称字数之和为2的自然数次方，则你可以令一名角色执行一个额外回合。",
			// ViraBot
			avn_virabot: "ViraBot",
			avn_infection: "侵染",
			avn_infection_info: "出牌阶段结束时，你可以展示一名角色的一张手牌，然后若此牌为红色，你获得此牌，否则你删除此牌。",
			// [Agent]
			avn_agent: "[Agent]",
			avn_surpression: "戡定",
			get avn_surpression_effect() {
				return this.avn_surpression;
			},
			get avn_surpression_info() {
				return `${this.avn_surpression_info_head}①【旋转】②【移动】③【点击】④【拖拽】${this.avn_surpression_info_tail}`;
			},
			avn_surpression_info_head: "转换技，每回合限一次，你可以视为使用一张",
			avn_surpression_info_tail: "，若如此做，且本技能的状态被变更过至少4次，你可以令一名角色本回合不能使用或打出牌。",
			// Animation vs. Minecraft
			avn_animation_vs_minecraft: "AvM",
			// Herobrine
			avn_herobrine: "Herobrine",
			avn_out_of_context: "异造",
			get avn_out_of_context_effect() {
				return this.avn_out_of_context;
			},
			avn_out_of_context_info: "当你扣减体力时，你可以将区域内的至多六张牌置入仁库，若如此做，本回合结束后，你将仁库中的等量牌交给一名角色。当有牌移出游戏后，你可以令一名手牌数不大于体力上限的角色获得牌堆底的一张牌。",
			// Purple
			avn_purple: "Purple",
			avn_ascending: "攀铭",
			_avn_ascending_info: "锁定技，若你本回合未因本技能弃置牌，则当你于此回合内使用第二张及以后牌时，若你本回合使用的牌的点数为严格递增，则你摸一张牌，否则你弃置你的体力值张牌。",
			get avn_ascending_info() {
				const unlockedCharacters = game.getExtensionConfig("桌面大战", "unlocked_characters");
				return unlockedCharacters.includes("avn_dark_blue") || unlockedCharacters.includes("avn_pink") ? `${this._avn_ascending_info}牌堆洗牌后，你修改本技能。` : this._avn_ascending_info;
			},
			get avn_ascending_rewrite() {
				return `${this.avn_ascending}·改`;
			},
			avn_ascending_rewrite_info: "锁定技，若你本回合未因本技能弃置任意角色的牌，则当你于此回合内使用第二张及以后牌时，若你本回合使用的牌的点数为严格递增，则你令一名角色摸一张牌，否则你弃置一名角色的至多你的体力值张牌。",
			// Dark Blue
			avn_dark_blue: "Dark Blue",
			// Pink
			avn_pink: "Pink",
			// King Orange
			avn_king_orange: "King Orange",
			avn_king_orange_ab: "King",
			avn_resistant: "抵倾",
			_avn_resistant_info: "锁定技，当你造成或受到伤害后，若你本回合未以此法获得过牌，则你亮出并获得牌堆底的你已损失的体力值张牌（至少一张），然后其中每有一张点数为K的牌，你获得牌堆底的一张牌。",
			get avn_resistant_info() {
				return game.getExtensionConfig("桌面大战", "unlocked_characters").includes("avn_gold") ? `${this._avn_resistant_info}牌堆洗牌后，你修改本技能。` : this._avn_resistant_info;
			},
			get avn_resistant_rewrite() {
				return `${this.avn_resistant}·改`;
			},
			avn_resistant_rewrite_info: "锁定技，当你造成或受到伤害后，若你本回合未以此法令一名角色获得过牌，则你令一名角色亮出并获得牌堆底的你已损失的体力值张牌（至少一张），然后这些牌中每有一张点数为K的牌，其获得牌堆底的一张牌。",
			// Gold
			avn_gold: "Gold",
			// Alexcrafter28
			avn_alexcrafter28: "Alexcrafter28",
			avn_alexcrafter28_ab: "Alex",
			avn_encounter: "探遇",
			avn_encounter_info: "出牌阶段限一次，你可以弃置一张牌，然后展示牌堆顶十张牌。若如此做，你可以获得一张展示牌。",
			// Warden
			ska_warden: "监守者",
			ska_zhenhan: "振撼",
			ska_zhenhan_effect: "振撼",
			ska_zhenhan_info: "准备阶段，或带有「赠」标签的牌进入弃牌堆后，你可以指定一名其他角色，若你至其距离大于1，则你本局游戏至其距离-1，否则你令其失去1点体力并复原本技能的距离计算。",
			// Animation vs. Super Mario Bros
			avn_animation_vs_super_mario_bros: "AvSMB",
			// Mario
			sst_mario: "马力欧",
			sst_jueyi: "决意",
			sst_jueyi_info: "锁定技，你使用牌指定目标时，若其手牌数大于你，你摸一张牌，令此牌不可被目标响应。",
			// Actual Shorts
			avn_actual_shorts: "Actual Shorts",
			// Kirby
			sst_kirby: "卡比",
			sst_qushi: "取噬",
			sst_qushi_info: "你对一名角色造成伤害后，你可以摸一张牌，或获得该角色的一个没有技能标签的技能直到你受到伤害后。",
			// Corn Dog Guy
			avn_corn_dog_guy: "Corn Dog Guy",
			avn_rebranding: "品创",
			avn_rebranding_info: "每名角色的出牌阶段限一次，其可以赠予你一张牌（若其为你，则改为弃置一张牌），若如此做，其摸一张牌。若你受到过伤害，则本技能中的前两个“一张牌”视为“两张牌”，”摸一张牌“视为”获得1点护甲“。"
		},
		help: {}
	};
	if (lib.device || lib.node) for (const character in ANIMATION_VS_NONAME.character) {
		ANIMATION_VS_NONAME.character[character][4].push(`ext:桌面大战/image/character/${character}.webp`);
	}
	else for (const character in ANIMATION_VS_NONAME.character) {
		ANIMATION_VS_NONAME.character[character][4].push(`db:extension-桌面大战:image/character/${character}.webp`);
	}
	for (const character in ANIMATION_VS_NONAME.character) {
		if (!new Set(["avn_alan_becker", "avn_alexcrafter28", "ska_warden", "sst_mario", "sst_kirby", "avn_corn_dog_guy"]).has(character) && !new Set(game.getExtensionConfig("桌面大战", "unlocked_characters")).has(character)) ANIMATION_VS_NONAME.character[character][4].push("unseen");
	}
	for (const skill in ANIMATION_VS_NONAME.skill) {
		ANIMATION_VS_NONAME.skill[skill].audio = false;
	}
	return ANIMATION_VS_NONAME;
});
