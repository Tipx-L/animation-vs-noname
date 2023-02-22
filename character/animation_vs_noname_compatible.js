"use strict";
game.import("character", function(lib, game1, ui, get, ai, _status) {
    /**
	 * @type {importCharacterConfig}
	 */ var ANIMATION_VS_NONAME = {
        name: "animation_vs_noname",
        connect: true,
        character: {
            avn_alan_becker: [
                "male",
                "shu",
                4,
                [
                    "avn_animate"
                ],
                []
            ],
            avn_victim: [
                "none",
                "wu",
                4,
                [
                    "avn_adaptive"
                ],
                []
            ],
            avn_the_chosen_one: [
                "none",
                "wei",
                4,
                [
                    "avn_overflow"
                ],
                []
            ],
            avn_the_dark_lord: [
                "none",
                "shu",
                4,
                [
                    "avn_terminal"
                ],
                []
            ],
            avn_the_second_coming: [
                "male",
                "qun",
                4,
                [
                    "avn_passionate"
                ],
                []
            ],
            avn_the_second_coming_the_chosen_one_s_return: [
                "male",
                "qun",
                4,
                [
                    "avn_awakening"
                ],
                []
            ],
            avn_red: [
                "male",
                "shu",
                4,
                [
                    "avn_combative"
                ],
                []
            ],
            avn_green: [
                "male",
                "wu",
                4,
                [
                    "avn_progressive"
                ],
                []
            ],
            avn_blue: [
                "none",
                "wei",
                4,
                [
                    "avn_midas_touch"
                ],
                []
            ],
            avn_yellow: [
                "male",
                "qun",
                4,
                [
                    "avn_technological"
                ],
                []
            ],
            avn_herobrine: [
                "male",
                "wei",
                4,
                [
                    "avn_out_of_context"
                ],
                []
            ],
            avn_purple: [
                "none",
                "jin",
                4,
                [
                    "avn_ascending"
                ],
                []
            ],
            avn_dark_blue: [
                "male",
                "wei",
                4,
                [
                    "avn_ascending"
                ],
                []
            ],
            avn_pink: [
                "female",
                "jin",
                4,
                [
                    "avn_ascending"
                ],
                []
            ],
            avn_king_orange: [
                "male",
                "qun",
                4,
                [
                    "avn_resistant"
                ],
                []
            ],
            avn_gold: [
                "male",
                "qun",
                4,
                [
                    "avn_resistant"
                ],
                []
            ],
            avn_alexcrafter28: [
                "male",
                "wu",
                4,
                [
                    "avn_encounter"
                ],
                []
            ],
            ska_warden: [
                "none",
                "wu",
                "4/10",
                [
                    "ska_zhenhan"
                ],
                []
            ]
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
                    "avn_the_second_coming_the_chosen_one_s_return",
                    "avn_red",
                    "avn_green",
                    "avn_blue",
                    "avn_yellow"
                ],
                avn_animation_vs_minecraft: [
                    "avn_herobrine",
                    "avn_purple",
                    "avn_dark_blue",
                    "avn_pink",
                    "avn_king_orange",
                    "avn_gold",
                    "avn_alexcrafter28",
                    "ska_warden"
                ]
            }
        },
        characterIntro: {
            avn_alan_becker: `武将作者：Show-K<br>
				插图作者：Alan Becker（前景）、Bradley G. Munkowitz（背景）<br>
				<hr>
				AvN0. 艾伦·贝克尔/Alan Becker<br>
				首次登场：<ruby>火柴人VS动画师 第一集<rp>（</rp><rt>Animator vs. Animation</rt><rp>）</rp></ruby><br>
				<hr>
				伴随火柴人们一起成长。`,
            avn_victim: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN1. 受害者/Victim<br>
				首次登场：<ruby>火柴人VS动画师 第一集<rp>（</rp><rt>Animator vs. Animation</rt><rp>）</rp></ruby><br>
				<hr>
				万物起源。`,
            avn_the_chosen_one: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN2. 天选之子/The Chosen One<br>
				首次登场：<ruby>火柴人VS动画师 第二集<rp>（</rp><rt>Animator vs. Animation 2</rt><rp>）</rp></ruby><br>
				<hr>
				奋起反抗。`,
            avn_the_dark_lord: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN3. 黑暗领主/The Dark Lord<br>
				首次登场：<ruby>火柴人VS动画师 第三集<rp>（</rp><rt>Animator vs. Animation III</rt><rp>）</rp></ruby><br>
				<hr>
				“mission.The_Dark_Lord = destroy(The_Chosen_One);”`,
            avn_the_second_coming: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN4. 再临者/The Second Coming<br>
				首次登场：<ruby>火柴人VS动画师 第四集<rp>（</rp><rt>Animator vs. Animation IV</rt><rp>）</rp></ruby><br>
				<hr>
				嘿！需要帮忙？`,
            avn_the_second_coming_the_chosen_one_s_return: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN4+. 再临者（天选之子归来）/The Second Coming (The Chosen One's Return)<br>
				首次登场：<ruby>新版火柴人 VS 动画师 第四集 决战<rp>（</rp><rt>The Showdown - AVA Shorts Episode 4</rt><rp>）</rp></ruby><br>
				<hr>
				<span style="font-size: 30px; font-weight: bold;">你终结了我的朋友。<br>现在我要终结你。</span>`,
            avn_red: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN5. 红/Red<br>
				首次登场：<ruby>火柴人VS动画师 第四集<rp>（</rp><rt>Animator vs. Animation IV</rt><rp>）</rp></ruby><br>
				<hr>
				身先士卒。`,
            avn_green: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN6. 绿/Green<br>
				首次登场：<ruby>火柴人VS动画师 第四集<rp>（</rp><rt>Animator vs. Animation IV</rt><rp>）</rp></ruby><br>
				<hr>
				锦上添花。`,
            avn_blue: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN7. 蓝/Blue<br>
				首次登场：<ruby>火柴人VS动画师 第四集<rp>（</rp><rt>Animator vs. Animation IV</rt><rp>）</rp></ruby><br>
				<hr>
				雪中送炭。`,
            avn_yellow: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN8. 黄/Yellow<br>
				首次登场：<ruby>火柴人VS动画师 第四集<rp>（</rp><rt>Animator vs. Animation IV</rt><rp>）</rp></ruby><br>
				<hr>
				精益求精。`,
            avn_herobrine: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN9. Herobrine<br>
				首次登场：<ruby>火柴人VS我的世界<rp>（</rp><rt>Animation vs. Minecraft</rt><rp>）</rp></ruby><br>
				<hr>
				未解之谜。`,
            avn_purple: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN10. 紫/Purple<br>
				首次登场：<ruby>火柴人VS我的世界系列 第八集（The Nether）<rp>（</rp><rt>The Nether - AVM Shorts Episode 8</rt><rp>）</rp></ruby><br>
				<hr>
				终于得到了认可。`,
            avn_dark_blue: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN10-1. 深蓝/Dark Blue<br>
				首次登场：<ruby>火柴人VS我的世界系列第二十九集 音符世界<rp>（</rp><rt>Note Block Universe - AVM Shorts Episode 29</rt><rp>）</rp></ruby><br>
				<hr>
				再也无法触及。`,
            avn_pink: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN10-2. 粉/Pink<br>
				首次登场：<ruby>火柴人VS我的世界系列第二十九集 音符世界<rp>（</rp><rt>Note Block Universe - AVM Shorts Episode 29</rt><rp>）</rp></ruby><br>
				<hr>
				再也无法挽留。`,
            avn_king_orange: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN11. 橙国王/King Orange<br>
				首次登场：<ruby>火柴人VS我的世界系列 第二十二集 跑酷<rp>（</rp><rt>Parkour - AVM Shorts Episode 22</rt><rp>）</rp></ruby><br>
				<hr>
				再也不想失去任何人了。再也不能失去任何人了。`,
            avn_gold: `武将作者：Show-K<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN11-1. 金/Gold<br>
				首次登场：<ruby>火柴人VS我的世界系列第三十集 国王<rp>（</rp><rt>The King - AVM Shorts Episode 30</rt><rp>）</rp></ruby><br>
				<hr>
				再也无法陪伴。`,
            avn_alexcrafter28: `联动来源：《大乱桌斗》<br>
				武将作者：Show-K、mario not mary<br>
				插图作者：Alan Becker<br>
				<hr>
				AvN12. Alexcrafter28<br>
				首次登场：<ruby>火柴人VS我的世界系列 第二十四集 郁葱洞穴<rp>（</rp><rt>Lush Caves - AVM Shorts Episode 24</rt><rp>）</rp></ruby><br>
				<hr>
				1428. 史蒂夫/Steve/スティーブ<br>
				系列：<ruby>我的世界<rp>（</rp><rt>Minecraft</rt><rp>）</rp></ruby><br>
				首次登场：<ruby>我的世界<rp>（</rp><rt>Minecraft</rt><rp>）</rp></ruby><br>
				来自一个由立方体构成的世界的神秘人物，身为一名探险家（同时还是一名矿工），他将（和他心爱的镐子）探索这个世界，并与各位斗士们进行一次武艺切磋。<br>
				——封羽翎烈，《任天堂明星大乱斗特别版全命魂介绍》<br>
				<hr>
				这个世界上未曾发生过有人玩Minecraft时突然有两个火柴人从游戏窗口内钻出来到桌面，然后找到邮件程序并把火柴人自己发送出去的事情。`,
            ska_warden: `联动来源：《大乱桌斗》<br>
				武将作者：Show-K<br>
				插图作者：《我的世界》<br>
				<hr>
				S010. 监守者/Warden/ウォーデン<br>
				系列：<ruby>我的世界<rp>（</rp><rt>Minecraft</rt><rp>）</rp></ruby><br>
				首次登场：<ruby>我的世界<rp>（</rp><rt>Minecraft</rt><rp>）</rp></ruby><br>
				监守者（Warden）是一种高大而危险的敌对生物，会根据振动和气息判断生物的位置。<br>
				——《Minecraft Wiki》<br>
				<hr>
				怎么总有人不听劝呢？`
        },
        characterTitle: {
            avn_alan_becker: "动画师",
            avn_victim: "起源",
            avn_the_chosen_one: "自由",
            avn_the_dark_lord: "天选之子之敌",
            avn_the_second_coming: "全能选手",
            avn_the_second_coming_the_chosen_one_s_return: "天选之子归来",
            avn_red: "格斗驯师",
            avn_green: "艺术专家",
            avn_blue: "制产劳工",
            avn_yellow: "技术支援",
            avn_herobrine: "故障",
            avn_purple: "追求",
            avn_dark_blue: "遥远",
            avn_pink: "落花",
            avn_king_orange: "执念",
            avn_gold: "稚子",
            avn_alexcrafter28: "世界奇闻者",
            ska_warden: "循声守卫"
        },
        perfectPair: {
            avn_victim: [
                "avn_alan_becker"
            ],
            avn_the_chosen_one: [
                "avn_alan_becker",
                "avn_victim"
            ],
            avn_the_dark_lord: [
                "avn_alan_becker",
                "avn_victim",
                "avn_the_chosen_one"
            ],
            avn_the_second_coming: [
                "avn_alan_becker",
                "avn_victim",
                "avn_the_chosen_one",
                "avn_the_dark_lord"
            ],
            avn_the_second_coming_the_chosen_one_s_return: [
                "avn_alan_becker",
                "avn_victim",
                "avn_the_chosen_one",
                "avn_the_dark_lord",
                "avn_the_second_coming"
            ],
            avn_red: [
                "avn_alan_becker",
                "avn_the_chosen_one",
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return"
            ],
            avn_green: [
                "avn_alan_becker",
                "avn_the_chosen_one",
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return",
                "avn_red"
            ],
            avn_blue: [
                "avn_alan_becker",
                "avn_the_chosen_one",
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return",
                "avn_red",
                "avn_green"
            ],
            avn_yellow: [
                "avn_alan_becker",
                "avn_the_chosen_one",
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return",
                "avn_red",
                "avn_green",
                "avn_blue"
            ],
            avn_herobrine: [
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return",
                "avn_red",
                "avn_green",
                "avn_blue",
                "avn_yellow"
            ],
            avn_purple: [
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return",
                "avn_red",
                "avn_green",
                "avn_blue",
                "avn_yellow",
                "avn_herobrine"
            ],
            avn_dark_blue: [
                "avn_purple"
            ],
            avn_pink: [
                "avn_purple",
                "avn_dark_blue"
            ],
            avn_king_orange: [
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return",
                "avn_red",
                "avn_green",
                "avn_blue",
                "avn_yellow",
                "avn_herobrine",
                "avn_purple"
            ],
            avn_gold: [
                "avn_king_orange"
            ],
            ska_warden: [
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return",
                "avn_red",
                "avn_green",
                "avn_blue",
                "avn_yellow",
                "avn_herobrine",
                "avn_purple",
                "avn_king_orange"
            ]
        },
        skill: {
            // Character Unlocking
            _avn_character_unlocking: {
                ruleSkill: true,
                forced: true,
                trigger: {
                    global: "phaseBefore",
                    player: "enterGame"
                },
                filter: function(event1, player1) {
                    return event1.name != "phase" || game1.phaseNumber == 0;
                },
                content: function(event1, step, source, player1) {
                    [
                        player1.name,
                        player1.name1,
                        player1.name2
                    ].forEach(function(value) {
                        switch(value){
                            case "avn_alan_becker":
                                if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_victim")) {
                                    lib.config.extension_桌面大战_unlocked_characters.push("avn_victim");
                                    game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                }
                                break;
                            case "avn_victim":
                                if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_the_chosen_one")) {
                                    lib.config.extension_桌面大战_unlocked_characters.push("avn_the_chosen_one");
                                    game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                }
                                break;
                            case "avn_the_chosen_one":
                                if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_the_dark_lord")) {
                                    lib.config.extension_桌面大战_unlocked_characters.push("avn_the_dark_lord");
                                    game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                }
                                break;
                            case "avn_the_dark_lord":
                                if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_the_second_coming")) {
                                    lib.config.extension_桌面大战_unlocked_characters.push("avn_the_second_coming");
                                    game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                }
                                break;
                            case "avn_the_second_coming":
                                var lockedCharacters = [
                                    "avn_red",
                                    "avn_green",
                                    "avn_blue",
                                    "avn_yellow"
                                ].filter(function(value) {
                                    return !lib.config.extension_桌面大战_unlocked_characters.contains(value);
                                });
                                if (lockedCharacters.length) {
                                    lib.config.extension_桌面大战_unlocked_characters.push(...lockedCharacters);
                                    game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                }
                                break;
                            case "avn_red":
                                if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_herobrine")) {
                                    lib.config.extension_桌面大战_unlocked_characters.push("avn_herobrine");
                                    game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                }
                                break;
                            case "avn_green":
                            case "avn_blue":
                                if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_purple")) {
                                    lib.config.extension_桌面大战_unlocked_characters.push("avn_purple");
                                    game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                }
                                break;
                            case "avn_purple":
                                if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_king_orange")) {
                                    lib.config.extension_桌面大战_unlocked_characters.push("avn_king_orange");
                                    game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                }
                        }
                    });
                }
            },
            // Alan Becker
            avn_animate: {
                delay: false,
                enable: "phaseUse",
                usable: 1,
                filter: function(event1, player1) {
                    return player1.hasCard(function(card) {
                        var type = get.type(card);
                        return type == "basic" || type == "trick";
                    }, "h");
                },
                position: "h",
                filterCard: function(card) {
                    var type = get.type(card);
                    return type == "basic" || type == "trick";
                },
                filterTarget: true,
                discard: false,
                lose: false,
                check: function(card) {
                    var handCardValues = _status.event.player.getCards("h").map(function(value) {
                        return get.value(value);
                    });
                    return Math.abs(get.value(card) - handCardValues.reduce(function(previousValue, currentValue) {
                        return previousValue + currentValue;
                    }, 0) / handCardValues.length);
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_cards;
                    player1.showCards(event1.card = cards[0], `${get.translation(player1)}对${function(targets) {
                        if (get.itemtype(targets) == "player") targets = [
                            targets
                        ];
                        if (targets[0] == player1) {
                            if (targets.length > 1) return `自己、${get.translation(targets.slice(1))}`;
                            return "自己";
                        }
                        return get.translation(targets);
                    }(target)}发动了【${get.skillTranslation(event1.name, player1)}】`);
                    "step 1";
                    if (target.hp > 0) player1.choosePlayerCard(target, "h", [
                        1,
                        target.hp
                    ], `${get.skillTranslation(event1.name, player1)}：令${get.translation(target)}至多${get.cnNumber(target.hp)}张手牌均视为${get.translation({
                        name: get.name(card),
                        nature: get.nature(card)
                    })}，直到其使用这些牌中的一张结算/回合结束后`).ai = function(button) {
                        return get.attitude(_status.event.player, _status.event.getParent().target) > 0 ? 11 - get.buttonValue(button) : get.buttonValue(button);
                    };
                    else event1.finish();
                    "step 2";
                    if ((_result_cards = result1.cards) === null || _result_cards === void 0 ? void 0 : _result_cards.length) {
                        var effectSkillName = `${event1.name}_effect`;
                        target.addGaintag(result1.cards, effectSkillName);
                        var name1 = get.name(card), nature = get.nature(card);
                        target.popup(name1, nature);
                        target.addTempSkill(effectSkillName, {
                            player: "phaseAfter"
                        });
                        target.storage[effectSkillName].add({
                            name: name1,
                            nature: nature
                        });
                        game1.delayx();
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        target: function(player1, target) {
                            if (ui.selected.cards.length) {
                                var cardValue = get.value(ui.selected.cards[0]), handCardValues = player1.getCards("h").map(function(value) {
                                    return get.value(value);
                                }), averageHandCardValue = handCardValues.reduce(function(previousValue, currentValue) {
                                    return previousValue + currentValue;
                                }, 0) / handCardValues.length;
                                if (cardValue < averageHandCardValue) return -Math.min(target.countCards("h"), Math.max(target.hp, 0));
                                if (cardValue > averageHandCardValue) return Math.min(target.countCards("h"), Math.max(target.hp, 0));
                            }
                            return 0;
                        }
                    }
                }
            },
            avn_animate_effect: {
                charlotte: true,
                init: function(player1, skill) {
                    if (!Array.isArray(player1.storage[skill])) player1.storage[skill] = [];
                },
                onremove: function(player1, skill) {
                    player1.removeGaintag(skill);
                    delete player1.storage[skill];
                },
                mark: true,
                intro: {
                    content: function(storage, player1) {
                        var affectedHandCards = player1.getCards("h", function(card) {
                            return card.hasGaintag("avn_animate_effect");
                        });
                        if (!affectedHandCards.length) return `无效果`;
                        if (player1.isUnderControl(true)) return `${get.translation(affectedHandCards)}${affectedHandCards.length > 1 ? "均" : ""}视为${get.translation(storage[storage.length - 1])}，直到你使用这些牌中的一张结算/回合结束后`;
                        return `有${get.cnNumber(affectedHandCards.length)}张手牌${affectedHandCards.length > 1 ? "均" : ""}视为${get.translation(storage[storage.length - 1])}，直到你使用这些牌中的一张结算/回合结束后`;
                    },
                    markcount: function(storage, player1) {
                        return player1.countCards("h", function(card) {
                            return card.hasGaintag("avn_animate_effect");
                        });
                    }
                },
                mod: {
                    cardname: function(card, player1) {
                        if (card.hasGaintag("avn_animate_effect")) {
                            var storage = player1.getStorage("avn_animate_effect");
                            return storage[storage.length - 1].name;
                        }
                    },
                    cardnature: function(card, player1) {
                        if (card.hasGaintag("avn_animate_effect")) {
                            var storage = player1.getStorage("avn_animate_effect");
                            return storage[storage.length - 1].nature;
                        }
                    }
                },
                forced: true,
                popup: false,
                trigger: {
                    player: "useCardAfter"
                },
                filter: function(event1, player1) {
                    return player1.hasHistory("lose", function(evt) {
                        if (evt.getParent() != event1) return false;
                        for(var cardid in evt.gaintag_map){
                            if (evt.gaintag_map[cardid].contains("avn_animate_effect")) return true;
                        }
                        return false;
                    });
                },
                content: function(event1, step, source, player1) {
                    player1.removeSkill(event1.name);
                },
                ai: {
                    nokeep: true
                }
            },
            // Victim
            avn_adaptive: {
                init: function(player1, skill) {
                    player1.addSkill(`${skill}_previous`);
                },
                hiddenCard: function(player1, name1) {
                    if (player1.getStat("skill").avn_adaptive) return false;
                    if (!player1.countCards("hes")) return false;
                    if (typeof player1.storage.avn_adaptive_previous != "object") return false;
                    return player1.storage.avn_adaptive_previous.name == name1;
                },
                locked: false,
                enable: [
                    "chooseToUse",
                    "chooseToRespond"
                ],
                usable: 1,
                position: "hes",
                filterCard: true,
                viewAs: function(cards, player1) {
                    return typeof player1.storage.avn_adaptive_previous == "object" ? player1.storage.avn_adaptive_previous : null;
                },
                filter: function(event1, player1) {
                    if (!player1.countCards("hes")) return false;
                    if (typeof player1.storage.avn_adaptive_previous != "object") return false;
                    return event1.filterCard(player1.storage.avn_adaptive_previous, player1, event1);
                },
                prompt: function() {
                    var avn_adaptive_previous = _status.event.player.storage.avn_adaptive_previous;
                    return `你可以展示所有手牌，并将一张牌当做${typeof avn_adaptive_previous == "object" ? get.translation(avn_adaptive_previous) : ""}使用或打出`;
                },
                check: function(card) {
                    return 7 - get.value(card);
                },
                precontent: function(event1, step, source, player1) {
                    var skill = event1.result.skill;
                    delete event1.result.skill;
                    var skillStat = player1.stat[player1.stat.length - 1].skill;
                    if (typeof skillStat[skill] == "undefined") skillStat[skill] = 1;
                    else skillStat[skill]++;
                    var targets = event1.result.targets;
                    player1.logSkill(skill, targets);
                    player1.showHandcards(`${get.translation(player1)}对${function(targets) {
                        if (get.itemtype(targets) == "player") targets = [
                            targets
                        ];
                        if (targets[0] == player1) {
                            if (targets.length > 1) return `自己、${get.translation(targets.slice(1))}`;
                            return "自己";
                        }
                        return get.translation(targets);
                    }(targets)}发动了【${get.skillTranslation(skill, player1)}】`);
                },
                mod: {
                    targetInRange: function(card) {
                        if (card.storage && card.storage.avn_adaptive) return true;
                    },
                    cardUsable: function(card) {
                        if (card.storage && card.storage.avn_adaptive) return Infinity;
                    }
                },
                ai: {
                    fireAttack: true,
                    respondSha: true,
                    respondShan: true,
                    respondTao: true,
                    save: true,
                    skillTagFilter: function(player1, tag) {
                        if (player1.getStat("skill").avn_adaptive) return false;
                        if (!player1.countCards("hes")) return false;
                        if (typeof player1.storage.avn_adaptive_previous != "object") return false;
                        switch(tag){
                            case "fireAttack":
                                if (player1.storage.avn_adaptive_previous.name != "huogong") return false;
                                break;
                            case "respondSha":
                                if (player1.storage.avn_adaptive_previous.name != "sha") return false;
                                break;
                            case "respondShan":
                                if (player1.storage.avn_adaptive_previous.name != "shan") return false;
                                break;
                            case "respondTao":
                                if (player1.storage.avn_adaptive_previous.name != "tao") return false;
                                break;
                            case "save":
                                if (!get.tag(player1.storage.avn_adaptive_previous, "save")) return false;
                        }
                    },
                    order: function(item, player1) {
                        return typeof player1.storage.avn_adaptive_previous == "object" ? get.order(player1.storage.avn_adaptive_previous) - 0.1 : 10;
                    }
                }
            },
            avn_adaptive_previous: {
                charlotte: true,
                firstDo: true,
                silent: true,
                trigger: {
                    global: "useCard1"
                },
                filter: function(event1) {
                    var type = get.type(event1.card);
                    return type == "basic" || type == "trick";
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger) {
                    var previousCard = player1.storage.avn_adaptive_previous = Object.assign({}, trigger.card);
                    delete previousCard.isCard;
                    delete previousCard.suit;
                    delete previousCard.number;
                    if (!previousCard.storage) previousCard.storage = {};
                    previousCard.storage.avn_adaptive = true;
                }
            },
            // The Chosen One
            avn_overflow: {
                direct: true,
                trigger: {
                    player: "phaseUseBegin"
                },
                filter: function(event1, player1) {
                    return player1.hasCard(function(card) {
                        return lib.filter.cardDiscardable(card, player1);
                    });
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_cards, _result_targets;
                    player1.chooseCardTarget({
                        position: "h",
                        filterCard: function(card, player1) {
                            return lib.filter.cardDiscardable(card, player1) && (!ui.selected.cards.length || get.suit(card) == get.suit(ui.selected.cards[0]));
                        },
                        selectCard: function() {
                            return ui.selected.cards.length ? _status.event.player.countCards("h", function(card) {
                                return lib.filter.cardDiscardable(card, _status.event.player) && get.suit(card) == get.suit(ui.selected.cards[0]);
                            }) : [
                                1,
                                Infinity
                            ];
                        },
                        filterTarget: true,
                        ai1: function(card) {
                            return 8 - get.useful(card) - Math.pow(_status.event.player.countCards("h", function(value) {
                                return get.suit(value) == get.suit(card);
                            }), 2);
                        },
                        ai2: function(target) {
                            var controls = lib.linked.slice();
                            controls.remove("kami");
                            controls.push("cancel2");
                            var _$player = _status.event.player;
                            return Math.max(...controls.map(function(value) {
                                return get.damageEffect(target, _$player, _$player, value);
                            }));
                        },
                        prompt: get.prompt(event1.name),
                        prompt2: get.skillInfoTranslation(event1.name, player1)
                    });
                    "step 1";
                    if (((_result_cards = result1.cards) === null || _result_cards === void 0 ? void 0 : _result_cards.length) && ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length)) {
                        event1.cards = result1.cards;
                        var _$target = event1.target = result1.targets[0];
                        player1.logSkill(event1.name, _$target);
                        player1.showHandcards(`${get.translation(player1)}对${function(targets) {
                            if (get.itemtype(targets) == "player") targets = [
                                targets
                            ];
                            if (targets[0] == player1) {
                                if (targets.length > 1) return `自己、${get.translation(targets.slice(1))}`;
                                return "自己";
                            }
                            return get.translation(targets);
                        }(_$target)}发动了【${get.skillTranslation(event1.name, player1)}】`);
                        if (_$target != player1) player1.addExpose(0.2);
                    } else event1.finish();
                    "step 2";
                    player1.discard(cards.filter(function(value) {
                        return lib.filter.cardDiscardable(value, player1);
                    }));
                    "step 3";
                    var controls = lib.linked.slice();
                    controls.remove("kami");
                    player1.chooseControl(...controls).set("prompt", `${get.skillTranslation(event1.name, player1)}：对${get.translation(target)}造成1点属性伤害`).ai = function(event1, player1) {
                        var choices = _status.event.controls.map(function(value) {
                            return get.damageEffect(_status.event.getParent().target, player1, player1, value);
                        }), max = Math.max(...choices);
                        return choices.reduce(function(previousValue, currentValue, currentIndex) {
                            if (currentValue == max) previousValue.push(currentIndex);
                            return previousValue;
                        }, []).randomGet();
                    };
                    "step 4";
                    if (result1.control) {
                        player1.line(target, result1.control);
                        var delayx = game1.createEvent("delayx");
                        event1.next.remove(delayx);
                        target.damage(result1.control, "nocard").after.push(delayx);
                        delayx.setContent(function() {
                            game1.delayx();
                        });
                    }
                }
            },
            // The Dark Lord
            avn_terminal: {
                direct: true,
                trigger: {
                    player: "phaseUseEnd"
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets;
                    player1.chooseTarget(get.prompt2(event1.name)).ai = function(target) {
                        var attitude = get.attitude(_status.event.player, target);
                        return (attitude < 0 ? -Math.sqrt(-attitude) : Math.sqrt(attitude)) * function() {
                            if (target.countCards("h") == 0 || target.hasSkillTag("noh")) return 0;
                            if (attitude <= 0 && !target.countCards("h")) return 1.5;
                            return -1.5;
                        }();
                    };
                    "step 1";
                    if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var _$target = event1.target = result1.targets[0];
                        player1.logSkill(event1.name, _$target);
                        player1.showCards(_$target.getCards("h"), `${get.translation(player1)}对${function(targets) {
                            if (get.itemtype(targets) == "player") targets = [
                                targets
                            ];
                            if (targets[0] == player1) {
                                if (targets.length > 1) return `自己、${get.translation(targets.slice(1))}`;
                                return "自己";
                            }
                            return get.translation(targets);
                        }(_$target)}发动了【${get.skillTranslation(event1.name, player1)}】`);
                        if (_$target != player1) player1.addExpose(0.2);
                    } else event1.finish();
                    "step 2";
                    if (target.countDiscardableCards(player1, "h")) player1.discardPlayerCard(`${get.skillTranslation(event1.name, player1)}：你可以弃置${get.translation(target)}的手牌中一种花色的所有牌`, target, "h", "visible").set("complexSelect", true).set("filterButton", function(button) {
                        return !ui.selected.buttons.length || get.suit(button.link) == get.suit(ui.selected.buttons[0].link);
                    }).set("selectButton", function() {
                        return ui.selected.buttons.length ? _status.event.getParent().target.countDiscardableCards(_status.event.player, "h", function(card) {
                            return get.suit(card) == get.suit(ui.selected.buttons[0].link);
                        }) : [
                            1,
                            Infinity
                        ];
                    }).ai = function(button) {
                        var _$player = _status.event.player, _$target = _status.event.getParent().target, buttonValue = get.buttonValue(button) + Math.pow(_$target.countDiscardableCards(_$player, "h", function(card) {
                            return get.suit(card) == get.suit(button.link);
                        }), 2) - 1;
                        if (get.attitude(_$player, _$target) > 0) return -buttonValue;
                        return buttonValue;
                    };
                    else event1.finish();
                    "step 3";
                    if (target != player1 && result1.cards && result1.cards.length) player1.addExpose(0.2);
                }
            },
            // The Second Coming
            avn_passionate: {
                intro: {
                    content: "上一张展示牌的颜色为$"
                },
                delay: false,
                enable: "phaseUse",
                usable: 1,
                filterTarget: function(card, player1, target) {
                    return target.countCards("h");
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_cards, _result_targets, _result_targets1;
                    player1.choosePlayerCard(target, "h", `${get.skillTranslation(event1.name, player1)}：展示${get.translation(target)}一张手牌。若展示牌为红/黑色，则你可以令一名角色摸/弃置一张牌${typeof player1.storage[event1.name] == "string" ? `；若展示牌不为${get.translation(player1.storage[event1.name])}，则你可以再令一名角色执行另一项` : ""}`, true);
                    "step 1";
                    if ((_result_cards = result1.cards) === null || _result_cards === void 0 ? void 0 : _result_cards.length) {
                        var showCardsFinish = game1.createEvent("showCardsFinish");
                        event1.next.remove(showCardsFinish);
                        player1.showCards(result1.cards, `${get.translation(player1)}对${function(targets) {
                            if (get.itemtype(targets) == "player") targets = [
                                targets
                            ];
                            if (targets[0] == player1) {
                                if (targets.length > 1) return `自己、${get.translation(targets.slice(1))}`;
                                return "自己";
                            }
                            return get.translation(targets);
                        }(target)}发动了【${get.skillTranslation(event1.name, player1)}】`).after.push(showCardsFinish);
                        showCardsFinish.player = player1;
                        showCardsFinish.skill = event1.name;
                        showCardsFinish.color = event1.color = get.color(result1.cards);
                        event1.previousColor = player1.storage[event1.name];
                        showCardsFinish.setContent(function() {
                            player1.storage[skill] = event1.color;
                            player1.markSkill(skill);
                            game1.broadcastAll(function(player1, skill, innerHTML) {
                                return player1.marks[skill].firstChild.innerHTML = innerHTML;
                            }, player1, skill, get.translation(event1.color)[0]);
                        });
                    }
                    "step 2";
                    if (event1.color == "red" || event1.color == "black") player1.chooseTarget(`${get.skillTranslation(event1.name, player1)}：你可以令一名角色${event1.color == "red" ? "摸" : "弃置"}一张牌`, function(card, player1, target) {
                        return _status.event.getParent().color == "red" || target.hasCard(function(card) {
                            return lib.filter.cardDiscardable(card, target);
                        }, "he");
                    }).set("targetprompt", function() {
                        return _status.event.getParent().color == "red" ? "摸牌" : "弃置牌";
                    }).ai = function(target) {
                        return _status.event.getParent().color == "red" ? get.sgnAttitude(_status.event.player, target) : (target.hasCard(function(card) {
                            return get.value(card, target) <= 0;
                        }, "e") ? 1 : -1) * get.attitude(_status.event.player, target);
                    };
                    else event1.finish();
                    "step 3";
                    if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        player1.line(result1.targets, "green");
                        switch(event1.color){
                            case "red":
                                result1.targets[0].draw();
                                break;
                            case "black":
                                result1.targets[0].chooseToDiscard(`${get.skillTranslation(event1.name, player1)}：弃置一张牌`, "he", true);
                        }
                    }
                    "step 4";
                    if (typeof event1.previousColor == "string" && event1.color != event1.previousColor) player1.chooseTarget(`${get.skillTranslation(event1.name, player1)}：你可以令一名角色${event1.color == "black" ? "摸" : "弃置"}一张牌`, function(card, player1, target) {
                        return _status.event.getParent().color == "black" || target.hasCard(function(card) {
                            return lib.filter.cardDiscardable(card, target);
                        }, "he");
                    }).set("targetprompt", function() {
                        return _status.event.getParent().color == "black" ? "摸牌" : "弃置牌";
                    }).ai = function(target) {
                        return _status.event.getParent().color == "black" ? get.sgnAttitude(_status.event.player, target) : (target.hasCard(function(card) {
                            return get.value(card, target) <= 0;
                        }, "e") ? 1 : -1) * get.attitude(player1, target);
                    };
                    else event1.finish();
                    "step 5";
                    if ((_result_targets1 = result1.targets) === null || _result_targets1 === void 0 ? void 0 : _result_targets1.length) {
                        player1.line(result1.targets, "green");
                        switch(event1.color){
                            case "black":
                                result1.targets[0].draw();
                                break;
                            case "red":
                                result1.targets[0].chooseToDiscard(`${get.skillTranslation(event1.name, player1)}：弃置一张牌`, "he", true);
                        }
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        target: function(player1, target) {
                            return Math.min(get.sgnAttitude(player1, target), 0);
                        }
                    }
                }
            },
            avn_anomaly: {
                charlotte: true,
                init: function(player1, skill) {
                    if (!player1.storage[skill]) {
                        player1.storage[skill] = 1;
                        game1.broadcastAll(function(player1) {
                            player1.nodying = true;
                            ui.window.addEventListener("animationend", function(ev) {
                                if (ev.animationName == "avn-pulse" || ev.animationName == "avn-strong-pulse") ui.window.classList.remove(ev.animationName);
                            });
                            setTimeout(function() {
                                var preloadLink = document.createElement("link");
                                preloadLink.rel = "preload";
                                preloadLink.href = `${lib.assetURL}extension/桌面大战/image/background/avn_the_second_coming_the_chosen_one_s_return_bg.webp`;
                                preloadLink.as = "image";
                                document.head.appendChild(preloadLink);
                            }, 1000);
                        }, player1);
                    }
                },
                forced: true,
                trigger: {
                    global: "phaseZhunbeiBegin"
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger) {
                    "step 0";
                    if (player1.storage[event1.name] == 1 && trigger.player == player1 && (player1.name == "avn_the_second_coming" || player1.name1 == "avn_the_second_coming" || player1.name2 == "avn_the_second_coming")) {
                        game1.broadcastAll(function(player1) {
                            var preAnomaly = document.getElementById("avn-pre-anomaly");
                            if (preAnomaly) {
                                preAnomaly.style.transitionDuration = "1s";
                                preAnomaly.style.boxShadow = "inset 0 0 200px 400px #d8eec2";
                                preAnomaly.style.opacity = "1";
                                setTimeout(function(preAnomaly) {
                                    _status._aozhan = true;
                                    game1.playBackgroundMusic();
                                    ui.background.setBackgroundImage(`extension/桌面大战/image/background/avn_the_second_coming_the_chosen_one_s_return_bg.webp`);
                                    preAnomaly.style.boxShadow = "inset 0 0 200px 200px #d8eec2";
                                    preAnomaly.style.opacity = "0";
                                }, 1000, preAnomaly);
                            } else setTimeout(function() {
                                _status._aozhan = true;
                                game1.playBackgroundMusic();
                                ui.background.setBackgroundImage(`extension/桌面大战/image/background/avn_the_second_coming_the_chosen_one_s_return_bg.webp`);
                            }, 1000);
                            if (player1.showIdentity) player1.showIdentity();
                        }, player1);
                        player1.storage[event1.name] == 2;
                        if (player1.name == "avn_the_second_coming") player1.reinit(player1.name, "avn_the_second_coming_the_chosen_one_s_return");
                        if (player1.name1 == "avn_the_second_coming") player1.reinit(player1.name1, "avn_the_second_coming_the_chosen_one_s_return");
                        if (player1.name2 == "avn_the_second_coming") player1.reinit(player1.name2, "avn_the_second_coming_the_chosen_one_s_return");
                        game1.triggerEnter(player1);
                    } else {
                        if (player1.getDamagedHp()) {
                            player1.recover("nocard")._triggered = null;
                            player1.draw()._triggered = null;
                        }
                        event1.finish();
                    }
                    "step 1";
                    if (player1.getDamagedHp()) {
                        var damagedHp = player1.maxHp - player1.hp;
                        player1.recover(damagedHp, "nocard")._triggered = null;
                        player1.draw(damagedHp)._triggered = null;
                    }
                    game1.broadcastAll(function(player1) {
                        return delete player1.nodying;
                    }, player1);
                    lib.onover.push(function(resultbool) {
                        if (resultbool) game1.filterPlayer2(function(current) {
                            return current.isUnderControl(true) && (current.name == "avn_the_second_coming_the_chosen_one_s_return" || current.name1 == "avn_the_second_coming_the_chosen_one_s_return" || current.name2 == "avn_the_second_coming_the_chosen_one_s_return");
                        }).forEach(function(value) {
                            return game1.filterPlayer2(function(current) {
                                lib.config.extension_桌面大战_unlocked_characters.add("avn_the_second_coming_the_chosen_one_s_return");
                                game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                                if (!current.isIn() && (current.isFriendsOf(value) || value.isFriendsOf(current))) game1.broadcastAll(function(current) {
                                    value.line(current, "green");
                                    current.in();
                                    if (current.isDead()) current.revive(current.maxHp);
                                }, current);
                            });
                        });
                    });
                }
            },
            _avn_anomaly_check: {
                ruleSkill: true,
                forced: true,
                trigger: {
                    player: "changeHp"
                },
                filter: function(event1, player1) {
                    if (lib.config.extension_桌面大战_unlocked_characters.contains("avn_the_second_coming_the_chosen_one_s_return")) return false;
                    if (player1.storage.avn_anomaly) return false;
                    if (event1.num > 0) return false;
                    if (player1.name != "avn_the_second_coming" && player1.name1 != "avn_the_second_coming" && player1.name2 != "avn_the_second_coming") return false;
                    var friends = game1.filterPlayer2(function(current) {
                        return current.isFriendsOf(player1) || player1.isFriendsOf(current);
                    }), inGameFriends = friends.filter(function(value) {
                        return value.isIn();
                    });
                    return inGameFriends.length < friends.length && inGameFriends.every(function(value) {
                        return value.name == "avn_the_second_coming" || value.name1 == "avn_the_second_coming" || value.name2 == "avn_the_second_coming";
                    });
                },
                content: function(event1, step, source, player1) {
                    if (!player1.storage.avn_pre_anomaly) {
                        player1.storage.avn_pre_anomaly = true;
                        game1.broadcastAll(function() {
                            var preAnomaly = document.createElement("div");
                            document.body.appendChild(preAnomaly);
                            preAnomaly.id = "avn-pre-anomaly";
                            setTimeout(function(preAnomaly) {
                                return preAnomaly.style.opacity = "0.5";
                            }, 1000, preAnomaly);
                        });
                    }
                    if (player1.hp <= 0) player1.addSkill("avn_anomaly");
                }
            },
            _avn_anomaly_effect: {
                ruleSkill: true,
                forced: true,
                trigger: {
                    global: "changeHp"
                },
                filter: function(event1) {
                    if (lib.config.extension_桌面大战_unlocked_characters.contains("avn_the_second_coming_the_chosen_one_s_return")) return false;
                    var evt = event1.getParent();
                    switch(evt.name){
                        case "damage":
                            return evt.player && evt.player.storage.avn_anomaly || evt.source && evt.source.storage.avn_anomaly;
                        case "loseHp":
                            var _evt_getParent;
                            if (evt.player && evt.player.storage.avn_anomaly) return true;
                            return (_evt_getParent = evt.getParent()) === null || _evt_getParent === void 0 ? void 0 : _evt_getParent.player.storage.avn_anomaly;
                    }
                    return false;
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger) {
                    if (trigger.num < -1) game1.broadcastAll(function() {
                        return ui.window.classList.add("avn-strong-pulse");
                    });
                    else game1.broadcastAll(function() {
                        return ui.window.classList.add("avn-pulse");
                    });
                }
            },
            // The Second Coming (The Chosen One's Return)
            avn_awakening: {
                delay: false,
                enable: "phaseUse",
                usable: 1,
                filterTarget: true,
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    player1.showCards(target.getCards("h"), `${get.translation(player1)}对${function(targets) {
                        if (get.itemtype(targets) == "player") targets = [
                            targets
                        ];
                        if (targets[0] == player1) {
                            if (targets.length > 1) return `自己、${get.translation(targets.slice(1))}`;
                            return "自己";
                        }
                        return get.translation(targets);
                    }(target)}发动了【${get.skillTranslation(event1.name, player1)}】`);
                    "step 1";
                    var controls = [
                        "选项二",
                        "cancel2"
                    ], lengthOfBlackCards = target.countCards("h", {
                        color: "black"
                    }), choiceList = [
                        `令${get.translation(target)}${lengthOfBlackCards ? `摸${get.cnNumber(lengthOfBlackCards)}张牌，然后` : ""}失去1点体力`
                    ], firstControl = [], redCards = target.getCards("h", function(card) {
                        return lib.filter.cardDiscardable(card, target) && get.color(card) == "red";
                    });
                    if (redCards.length) firstControl.push(`弃置${get.translation(redCards)}`);
                    if (target.getDamagedHp()) firstControl.push("回复1点体力");
                    if (firstControl.length) {
                        controls.unshift("选项一");
                        choiceList.unshift(`令${get.translation(target)}${firstControl.join("，然后")}`);
                    } else choiceList.unshift(`<span style="opacity: 0.5;">此选项不可用</span>`);
                    player1.chooseControl(...controls).set("choiceList", choiceList).set("prompt", `${get.skillTranslation(event1.name, player1)}：你可以选择一项`).ai = function(event1, player1) {
                        var choices = _status.event.controls.filter(function(value) {
                            if (value == "选项一" || value == "选项二") {
                                var _$target = event1.target, attitude = -get.attitude(player1, _$target), squareRootOfAttitude = attitude < 0 ? -Math.sqrt(-attitude) : Math.sqrt(attitude);
                                if (value == "选项一") {
                                    var valueOfRedCards = _$target.getCards("h", function(card) {
                                        return lib.filter.cardDiscardable(card, _$target) && get.color(card) == "red";
                                    }).reduce(function(previousValue, currentValue) {
                                        return previousValue + get.value(currentValue, _$target);
                                    }, 0);
                                    return -squareRootOfAttitude * (valueOfRedCards < 0 ? -Math.sqrt(-valueOfRedCards) : Math.sqrt(valueOfRedCards)) + get.recoverEffect(_$target, player1, player1) > 0;
                                } else return squareRootOfAttitude * _$target.countCards("h", {
                                    color: "black"
                                }) * 0.75 + get.effect(_$target, {
                                    name: "losehp"
                                }, player1, player1) > 0;
                            }
                            return false;
                        });
                        if (choices.length) return choices.randomGet();
                        return "cancel2";
                    };
                    "step 2";
                    switch(result1.control){
                        case "选项一":
                            var redCards1 = target.getCards("h", function(card) {
                                return lib.filter.cardDiscardable(card, target) && get.color(card) == "red";
                            });
                            if (redCards1.length) target.discard(redCards1);
                            if (target.getDamagedHp()) {
                                var delayx = game1.createEvent("delayx");
                                event1.next.remove(delayx);
                                target.recover("nocard").after.push(delayx);
                                delayx.setContent(function() {
                                    game1.delayx();
                                });
                            }
                            break;
                        case "选项二":
                            var lengthOfBlackCards1 = target.countCards("h", {
                                color: "black"
                            });
                            if (lengthOfBlackCards1) target.draw(lengthOfBlackCards1);
                            var delayx1 = game1.createEvent("delayx");
                            event1.next.remove(delayx1);
                            target.loseHp().after.push(delayx1);
                            delayx1.setContent(function() {
                                game1.delayx();
                            });
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        target: function(player1, target) {
                            return get.sgnAttitude(player1, target);
                        }
                    }
                }
            },
            // Red
            avn_combative: {
                intro: {
                    content: "expansion",
                    markcount: "expansion"
                },
                onremove: function(player1, skill) {
                    var cards = player1.getExpansions(skill);
                    if (cards.length) player1.loseToDiscardpile(cards);
                },
                direct: true,
                trigger: {
                    global: [
                        "eventNeutralized",
                        "shaMiss"
                    ],
                    player: "damageEnd"
                },
                filter: function(event1, player1, name1) {
                    return name1 == "damageEnd" ? player1.hasCard(function(card) {
                        return game1.hasPlayer(function(current) {
                            return lib.filter.canBeGained(card, current, player1);
                        });
                    }, "sx") : player1.countCards("hej");
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets, _result_cards;
                    if (event1.triggername == "damageEnd") player1.chooseTarget(get.prompt(event1.name), `你可以将武将牌上${trigger.num > 1 ? "至多" : ""}${get.cnNumber(trigger.num)}张牌交给一名角色`).ai = function(target) {
                        return Math.max(..._status.event.player.getCards("sx", function(card) {
                            return lib.filter.canBeGained(card, target, _status.event.player);
                        }).map(function(value) {
                            return get.sgnAttitude(_status.event.player, target) * get.value(value, target);
                        }));
                    };
                    else player1.choosePlayerCard(player1, "hej", `###${get.prompt(event1.name)}###你可以将区域内的一张红色牌置于武将牌上，视为使用一张决斗`).set("filterButton", function(button) {
                        return get.color(button.link) == "red";
                    }).ai = function(button) {
                        var buttonValue = get.buttonValue(button);
                        return buttonValue < 0 ? 8 - buttonValue : _status.event.player.getUseValue({
                            name: "juedou",
                            isCard: true
                        }) > 0 ? 8 - buttonValue : 0;
                    };
                    "step 1";
                    if (event1.triggername == "damageEnd") if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var _$target = event1.target = result1.targets[0];
                        player1.logSkill(event1.name, _$target);
                        player1.chooseCardButton(`${get.skillTranslation(event1.name, player1)}：将武将牌上${trigger.num > 1 ? "至多" : ""}${get.cnNumber(trigger.num)}张牌交给${get.translation(_$target)}`, true, [
                            1,
                            trigger.num
                        ], player1.getCards("sx")).set("filterButton", function(button, player1) {
                            return lib.filter.canBeGained(button.link, _status.event.getParent().target, player1);
                        }).ai = function(button) {
                            var _$target = _status.event.getParent().target;
                            return get.attitude(_status.event.player, _$target) * get.value(button.link, _$target);
                        };
                    } else event1.finish();
                    else if ((_result_cards = result1.cards) === null || _result_cards === void 0 ? void 0 : _result_cards.length) {
                        player1.logSkill(event1.name);
                        player1.addToExpansion(result1.cards, player1, "give").gaintag.add(event1.name);
                    } else event1.finish();
                    "step 2";
                    if (event1.triggername == "damageEnd") {
                        var _result_links;
                        if ((_result_links = result1.links) === null || _result_links === void 0 ? void 0 : _result_links.length) {
                            player1.give(result1.links, target);
                            player1.addExpose(0.2);
                        }
                    } else if (player1.hasUseTarget({
                        name: "juedou",
                        isCard: true
                    })) player1.chooseUseTarget({
                        name: "juedou",
                        isCard: true
                    }, true, false);
                },
                ai: {
                    maixie: true,
                    skillTagFilter: function(player1) {
                        if (!player1.hasCard(function(card) {
                            return game1.hasPlayer(function(current) {
                                return lib.filter.canBeGained(card, current, player1);
                            });
                        }, "sx")) return false;
                    }
                }
            },
            // Green
            avn_progressive: {
                locked: false,
                mod: {
                    aiOrder: function(player1, card, num) {
                        var history = player1.getAllHistory("useCard");
                        if (!history.length) return num + Math.pow(Math.abs(card.number - 7), 2);
                        var cardNumbers = history.map(function(evt) {
                            return evt.card.number;
                        }), length = cardNumbers.length, secondCardNumber = cardNumbers[length - 1], thirdCardNumber = card.number;
                        if (history.length > 1) {
                            var firstCardNumber = cardNumbers[length - 2];
                            if (firstCardNumber <= secondCardNumber && secondCardNumber <= thirdCardNumber) return Math.max(20 - Math.pow(thirdCardNumber - secondCardNumber, 2), 1);
                            if (firstCardNumber >= secondCardNumber && secondCardNumber >= thirdCardNumber) return Math.max(20 - Math.pow(secondCardNumber - thirdCardNumber, 2), 1);
                        }
                        return Math.max(num + 10 - Math.pow(Math.abs(secondCardNumber - thirdCardNumber), 2), 1);
                    }
                },
                direct: true,
                trigger: {
                    player: "useCard"
                },
                filter: function(event1, player1) {
                    var history = player1.getAllHistory("useCard");
                    if (history.length < 3) return false;
                    var cardNumbers = history.map(function(evt) {
                        return evt.card.number;
                    }), length = cardNumbers.length, firstCardNumber = cardNumbers[length - 3], secondCardNumber = cardNumbers[length - 2], thirdCardNumber = event1.card.number;
                    return firstCardNumber <= secondCardNumber && secondCardNumber <= thirdCardNumber || firstCardNumber >= secondCardNumber && secondCardNumber >= thirdCardNumber;
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets;
                    player1.chooseCardTarget({
                        position: "he",
                        filterCard: lib.filter.cardDiscardable,
                        selectCard: [
                            0,
                            Infinity
                        ],
                        filterTarget: true,
                        selectTarget: function() {
                            return [
                                1,
                                ui.selected.cards.length + 1
                            ];
                        },
                        ai1: function(card) {
                            return ui.selected.cards.length + 1 < game1.filterPlayer(function(current) {
                                return get.attitude(_status.event.player, current) > 0;
                            }).length && 5 - get.useful(card);
                        },
                        ai2: function(target) {
                            return get.attitude(player1, target);
                        },
                        prompt: get.prompt(event1.name),
                        prompt2: get.skillInfoTranslation(event1.name, player1)
                    });
                    "step 1";
                    if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var _result_cards;
                        var targets1 = result1.targets.sortBySeat(_status.currentPhase);
                        player1.logSkill(event1.name, targets1);
                        if (targets1.filter(function(value) {
                            return value != player1;
                        }).length) player1.addExpose(0.2);
                        if ((_result_cards = result1.cards) === null || _result_cards === void 0 ? void 0 : _result_cards.length) player1.discard(result1.cards).delay = false;
                        game1.asyncDraw(targets1);
                    }
                }
            },
            // Blue
            avn_midas_touch: {
                frequent: true,
                trigger: {
                    global: "phaseJieshuBegin"
                },
                filter: function(event1, player1) {
                    return player1.hasHistory("useCard", function(evt) {
                        return evt.card.suit == "club";
                    }) || player1.hasHistory("respond", function(evt) {
                        return evt.card.suit == "club";
                    });
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets, _result_links;
                    player1.showCards(event1.cards = game1.cardsGotoOrdering(get.cards(3)).cards, `${get.translation(player1)}发动了【${get.skillTranslation(event1.name, player1)}】`);
                    "step 1";
                    if (cards.length) player1.chooseTarget([
                        1,
                        3
                    ], `${get.skillTranslation(event1.name, player1)}：令至多三名角色可以依次获得${get.translation(cards)}${cards.length > 1 ? "中的一张牌" : ""}`).ai = function(target) {
                        var attitude = get.attitude(_status.event.player, target), squareRootOfAttitude = attitude < 0 ? -Math.sqrt(-attitude) : Math.sqrt(attitude), _$cards = _status.event.getParent().cards, preChosenTargets = [
                            ...ui.selected.targets,
                            target
                        ].sortBySeat(_status.currentPhase);
                        preChosenTargets.splice(preChosenTargets.indexOf(target));
                        if (!preChosenTargets.length) {
                            var possibleEffects = _$cards.map(function(value) {
                                return squareRootOfAttitude * get.value(value, target);
                            });
                            return attitude > 0 ? Math.max(...possibleEffects) : Math.min(...possibleEffects);
                        }
                        var possibleEffects1 = preChosenTargets.reduce(function(previousValue, currentValue) {
                            var possibleCardValues = previousValue.map(function(value) {
                                return get.value(value, currentValue);
                            }), max = Math.max(...possibleCardValues);
                            if (max > 0) previousValue.splice(possibleCardValues.indexOf(max), 1);
                            return previousValue;
                        }, _$cards.slice()).map(function(value) {
                            return squareRootOfAttitude * get.value(value, target);
                        });
                        return attitude > 0 ? Math.max(...possibleEffects1) : Math.min(...possibleEffects1);
                    };
                    else event1.finish();
                    "step 2";
                    if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        player1.line(event1.targets = result1.targets.sortBySeat(_status.currentPhase), "green");
                        event1.num = 0;
                    } else event1.finish();
                    "step 3";
                    targets[num].chooseCardButton(`${get.skillTranslation(event1.name, player1)}：你可以获得${get.translation(cards)}${cards.length > 1 ? "中的一张牌" : ""}`, cards).ai = function(button) {
                        return get.value(button.link, _status.event.player);
                    };
                    "step 4";
                    if ((_result_links = result1.links) === null || _result_links === void 0 ? void 0 : _result_links.length) {
                        var links = result1.links;
                        cards.removeArray(links);
                        targets[num].gain(links, "gain2");
                    }
                    event1.num++;
                    if (event1.num < targets.length) event1.goto(3);
                }
            },
            // Yellow
            avn_technological: {
                round: 1,
                direct: true,
                trigger: {
                    player: "phaseEnd"
                },
                filter: function() {
                    return Math.log2(game1.getGlobalHistory("cardMove", function(evt) {
                        return evt.name == "lose" && evt.position == ui.discardPile || evt.name == "cardsDiscard";
                    }).map(function(value) {
                        return value.cards;
                    }).flat().reduce(function(previousValue, currentValue) {
                        return previousValue + get.translation(currentValue.name).length;
                    }, 0)) % 1 === 0;
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets;
                    player1.chooseTarget(get.prompt2(event1.name)).ai = function(target) {
                        if (target.hasJudge("lebu")) return -1;
                        if (get.attitude(player1, target) > 4) return get.threaten(target) / Math.sqrt(target.hp + 1) / Math.sqrt(target.countCards("h") + 1);
                        return -1;
                    };
                    "step 1";
                    if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var target1 = result1.targets[0];
                        player1.logSkill(event1.name, target1);
                        if (target1 != player1) player1.addExpose(0.2);
                        target1.insertPhase();
                    }
                }
            },
            // Herobrine
            avn_out_of_context: {
                init: function(player1) {
                    if (!player1.storage.renku) player1.storage.renku = true;
                },
                direct: true,
                trigger: {
                    player: "changeHp",
                    global: [
                        "loseAfter",
                        "equipAfter",
                        "addJudgeAfter",
                        "gainAfter",
                        "loseAsyncAfter",
                        "addToExpansionAfter",
                        "cardsGotoSpecialAfter"
                    ]
                },
                filter: function(event1, player1, name1) {
                    if (name1 == "changeHp") return event1.num < 0 && player1.countCards("hej");
                    if (!ui.discardPile.childNodes.length) return false;
                    if (event1.fromStorage) return true;
                    if (name1 != "cardsGotoSpecialAfter") {
                        var evt = event1.getl(player1);
                        if (evt.xs.length || evt.ss.length) return true;
                    }
                    if (name1 == "loseAfter" || name1 == "loseAsyncAfter") return event1.getlx !== false && event1.toStorage;
                    if (name1 == "cardsGotoSpecialAfter") return !event1.notrigger;
                    return name1 != "equipAfter" && name1 != "addJudgeAfter" && name1 != "gainAfter";
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets;
                    if (event1.triggername == "changeHp") player1.choosePlayerCard(player1, "hej", [
                        1,
                        6
                    ], `###${get.prompt(event1.name)}###你可以将区域内的至多六张牌置入仁库。若如此做，本回合结束后，你将仁库中的等量牌交给一名角色`).ai = function(button) {
                        return 5 - get.buttonValue(button);
                    };
                    else player1.chooseTarget(get.prompt(event1.name), `你可以将${ui.discardPile.childNodes.length ? get.translation(ui.discardPile.childNodes[0]) : ""}交给一名角色`).ai = function(target) {
                        return ui.discardPile.childNodes.length && get.sgnAttitude(_status.event.player, target) * get.value(ui.discardPile.childNodes[0], target);
                    };
                    "step 1";
                    if (event1.triggername == "changeHp") {
                        var _result_cards;
                        if ((_result_cards = result1.cards) === null || _result_cards === void 0 ? void 0 : _result_cards.length) {
                            var cards1 = result1.cards;
                            player1.logSkill(event1.name);
                            var loseFinish = game1.createEvent("loseFinish");
                            event1.next.remove(loseFinish);
                            player1.$throw(cards1);
                            player1.lose(cards1, ui.special, "toRenku").after.push(loseFinish);
                            game1.log(player1, "将", cards1, "置入了仁库");
                            loseFinish.player = player1;
                            loseFinish.skill = event1.name;
                            loseFinish.num = cards1.length;
                            loseFinish.setContent(function() {
                                var name1 = `${skill}_effect`;
                                player1.addTempSkill(name1, {
                                    player: `${name1}Begin`
                                });
                                player1.storage[name1].push(num);
                            });
                            var phase = event1.getParent("phase");
                            if ((phase === null || phase === void 0 ? void 0 : phase.name) == "phase") {
                                var avnOutOfContextFinish = game1.createEvent("avnOutOfContextFinish");
                                event1.next.remove(avnOutOfContextFinish);
                                phase.after.push(avnOutOfContextFinish);
                                avnOutOfContextFinish.player = player1;
                                loseFinish.skill = event1.name;
                                avnOutOfContextFinish.setContent(function() {
                                    delete player1.storage[`${skill}_effect`];
                                });
                            }
                        }
                    } else if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var target1 = event1.target = result1.targets[0];
                        player1.logSkill(event1.name, target1);
                        if (ui.discardPile.childNodes.length) {
                            player1.give(ui.discardPile.childNodes[0], target1, true);
                            if (target1 != player1) player1.addExpose(0.2);
                        } else {
                            player1.chat("无牌可交给了吗");
                            game1.log("但是弃牌堆里面已经没有牌了！");
                        }
                    }
                }
            },
            avn_out_of_context_effect: {
                charlotte: true,
                init: function(player1, skill) {
                    if (!player1.storage.renku) player1.storage.renku = true;
                    if (!Array.isArray(player1.storage[skill])) player1.storage[skill] = [];
                },
                direct: true,
                trigger: {
                    global: "phaseAfter"
                },
                filter: function(event1, player1) {
                    return player1.storage.avn_out_of_context_effect.length && _status.renku.filter(function(value) {
                        return game1.hasPlayer(function(current) {
                            return lib.filter.canBeGained(value, current, player1);
                        });
                    }).length;
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets, _result_links;
                    var numberOfRenkuCards = _status.renku.filter(function(value) {
                        return game1.hasPlayer(function(current) {
                            return lib.filter.canBeGained(value, current, player1);
                        });
                    }).length;
                    if (numberOfRenkuCards && player1.storage[event1.name].length) {
                        var _$num = event1.num = player1.storage[event1.name].shift();
                        player1.chooseTarget(`${get.skillTranslation(event1.name, player1)}：将仁库中的${get.cnNumber(Math.min(numberOfRenkuCards, _$num))}张牌交给一名角色`, true).ai = function(target) {
                            return Math.max(..._status.renku.filter(function(value) {
                                return game1.hasPlayer(function(current) {
                                    return lib.filter.canBeGained(value, current, player1);
                                });
                            }).map(function(value) {
                                return get.sgnAttitude(_status.event.player, target) * get.value(value, target);
                            }));
                        };
                    } else event1.finish();
                    "step 1";
                    if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var _$target = event1.target = result1.targets[0];
                        player1.logSkill(event1.name, _$target);
                        var numberOfCardsNeedToGive = Math.min(_status.renku.filter(function(value) {
                            return game1.hasPlayer(function(current) {
                                return lib.filter.canBeGained(value, current, player1);
                            });
                        }).length, num);
                        player1.chooseCardButton(`${get.skillTranslation(event1.name, player1)}：将仁库中的${get.cnNumber(numberOfCardsNeedToGive)}张牌交给${get.translation(_$target)}`, true, [
                            1,
                            numberOfCardsNeedToGive
                        ], _status.renku).set("filterButton", function(button, player1) {
                            return lib.filter.canBeGained(button.link, _status.event.getParent().target, player1);
                        }).ai = function(button) {
                            var _$target = _status.event.getParent().target;
                            return get.attitude(_status.event.player, _$target) * get.value(button.link, _$target);
                        };
                    } else event1.finish();
                    "step 2";
                    if ((_result_links = result1.links) === null || _result_links === void 0 ? void 0 : _result_links.length) {
                        _status.renku.removeArray(result1.links);
                        game1.updateRenku();
                        player1.give(result1.links, target, true).set("fromStorage", true).fromRenku = true;
                        if (target != player1) player1.addExpose(0.2);
                    }
                    event1.goto(0);
                }
            },
            // Purple, Dark Blue, Pink
            avn_ascending: {
                derivation: "avn_ascending_rewrite",
                intro: {
                    content: function(storage, player1) {
                        return get.skillInfoTranslation("avn_ascending", player1);
                    }
                },
                mod: {
                    aiOrder: function(player1, card, num) {
                        var lastUsed = player1.getLastUsed();
                        if (lastUsed) {
                            if (card.number > lastUsed.card.number) return Math.max(21 - Math.pow(card.number - lastUsed.card.number, 2), 1);
                        }
                        return num + 10 / card.number;
                    }
                },
                direct: true,
                trigger: {
                    player: [
                        "useCard",
                        "gainAfter",
                        "changeHp",
                        "loseMaxHpAfter"
                    ],
                    global: "loseAsyncAfter"
                },
                filter: function(event1, player1, name1) {
                    return name1 == "useCard" ? player1.getHistory("useCard").length > 1 : !player1.storage.avn_ascending && player1.getAllHistory("gain", function(evt) {
                        var draw = evt.getParent();
                        if (draw.name != "draw") return false;
                        var phase = draw.getParent("phase");
                        return (phase === null || phase === void 0 ? void 0 : phase.player) != player1;
                    }).length >= player1.hp;
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets;
                    if (event1.triggername == "useCard") if (event1.isStrictlyIncreasing = player1.getHistory("useCard").map(function(value) {
                        return value.card.number;
                    }).every(function(value, index, array) {
                        return !index || value > array[index - 1];
                    })) if (player1.storage[event1.name]) player1.chooseTarget(`${get.skillTranslation(event1.name, player1)}：令一名角色摸一张牌`, true).set("targetprompt", "摸牌").ai = function(target) {
                        return get.sgnAttitude(_status.event.player, target);
                    };
                    else {
                        player1.logSkill(event1.name);
                        player1.draw("nodelay");
                        event1.finish();
                    }
                    else if (player1.storage[event1.name]) player1.chooseTarget(`${get.skillTranslation(event1.name, player1)}：令一名角色本回合不能使用或打出牌`, true).set("targetprompt", "禁止牌").ai = function(target) {
                        return -get.attitude(_status.event.player, target) * Math.sqrt(target.countCards("h", function(card) {
                            var _$player = _status.event.player;
                            return lib.filter.cardEnabled(card, _$player, "forceEnable") && lib.filter.cardRespondable(card, _$player) && lib.filter.cardUsable(card, _$player);
                        }) + 1);
                    };
                    else {
                        player1.logSkill(event1.name);
                        player1.addTempSkill(`${event1.name}_invalid`);
                        player1.addTempSkill(`${event1.name}_effect`);
                        event1.finish();
                    }
                    else {
                        var name1 = event1.name;
                        player1.logSkill(name1);
                        player1.trySkillAnimate(`${name1}_rewrite`, name1, player1.checkShow(name1));
                        if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_dark_blue") || !lib.config.extension_桌面大战_unlocked_characters.contains("avn_pink")) {
                            lib.config.extension_桌面大战_unlocked_characters.add("avn_dark_blue");
                            lib.config.extension_桌面大战_unlocked_characters.add("avn_pink");
                            game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                            game1.broadcastAll(function(skill) {
                                lib.characterIntro.avn_purple = `武将作者：Show-K<br>
									插图作者：Alan Becker<br>
									<hr>
									AvN10. 紫/Purple<br>
									首次登场：<ruby>火柴人VS我的世界系列 第八集（The Nether）<rp>（</rp><rt>The Nether - AVM Shorts Episode 8</rt><rp>）</rp></ruby><br>
									似乎来自其他使用者的电脑，性格自私。首次登场于衍生系列作品《火柴人VS我的世界系列》第一季第九集，与绿和蓝进入末地讨伐末影龙，途中却背叛蓝和绿并在取走龙蛋后回到电脑，最后因将末影龙引入村庄中而被村民们关进监狱里。在短片《火柴人VS英雄联盟》与再临者一行人和解。<br>
									于《火柴人VS我的世界系列》第三季第三集再度登场，紫把再临者一行人带到跑酷世界中，而后却指使猪灵蛮兵囚禁五人。实际上成为了橙国王的手下，并被奉命要马上为他得到创造模式能力，以统治《我的世界》世界。<br>
									最后遭到出卖，在战斗时放弃了统治《我的世界》。与绿在另外的下界门走出世界。<br>
									——《维基百科》<br>
									<hr>
									终于得到了认可。`;
                                lib.skill[skill].derivation = `${skill}_rewrite`;
                                lib.translate[`${skill}_info`] = "锁定技，当你于一回合内使用非第一张牌时，若本回合使用过的所有牌的点数为严格递增，则摸一张牌，否则本回合〖攀铭〗失效且不能使用或打出牌；若你因回合外摸牌而获得牌的次数不小于体力值，则你修改〖攀铭〗。";
                            }, name1);
                        }
                        player1.storage[name1] = true;
                        player1.markSkill(name1);
                        game1.log(player1, "修改了技能", `#g【${get.skillTranslation(name1, player1)}】`);
                        event1.finish();
                    }
                    "step 1";
                    if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var target1 = result1.targets[0];
                        player1.logSkill(event1.name, target1);
                        if (target1 != player1) player1.addExpose(0.2);
                        if (event1.isStrictlyIncreasing) target1.draw("nodelay");
                        else {
                            player1.addTempSkill(`${event1.name}_invalid`);
                            target1.addTempSkill(`${event1.name}_effect`);
                        }
                    }
                }
            },
            avn_ascending_invalid: {
                charlotte: true,
                init: function(player1, skill) {
                    return player1.addSkillBlocker(skill);
                },
                onremove: function(player1, skill) {
                    return player1.removeSkillBlocker(skill);
                },
                mark: true,
                intro: {
                    content: "失效技能：攀铭"
                },
                skillBlocker: function(skill) {
                    return skill == "avn_ascending";
                }
            },
            avn_ascending_effect: {
                charlotte: true,
                mark: true,
                marktext: "禁",
                intro: {
                    content: "你本回合不能使用或打出牌"
                },
                mod: {
                    cardEnabled2: function() {
                        return false;
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
                derivation: "avn_resistant_rewrite",
                intro: {
                    content: function(storage, player1) {
                        return get.skillInfoTranslation("avn_resistant", player1);
                    }
                },
                locked: true,
                direct: true,
                trigger: {
                    global: [
                        "equipAfter",
                        "addJudgeAfter",
                        "loseAfter",
                        "gainAfter",
                        "loseAsyncAfter",
                        "addToExpansionAfter",
                        "washCard"
                    ]
                },
                filter: function(event1, player1, name1) {
                    return name1 == "washCard" ? !player1.storage.avn_resistant : (player1.storage.avn_resistant ? !game1.hasPlayer2(function(current) {
                        return current.hasHistory("gain", function(evt) {
                            var draw = evt.getParent();
                            if (draw.name != "draw") return false;
                            var avnResistant = draw.getParent();
                            return avnResistant && avnResistant.name == "avn_resistant" && avnResistant.player == player1;
                        });
                    }) : !player1.hasHistory("gain", function(evt) {
                        var draw = evt.getParent();
                        if (draw.name != "draw") return false;
                        var avnResistant = draw.getParent();
                        return avnResistant && avnResistant.name == "avn_resistant" && avnResistant.player == player1;
                    })) && (game1.hasPlayer2(function(current) {
                        if (event1.name == "gain" && event1.player == current) return false;
                        var evt = event1.getl(current);
                        return evt && evt.es && evt.es.some(function(value) {
                            return get.number(value) == 13;
                        });
                    }) || (event1.name == "equip" || event1.name == "addJudge" || event1.visible) && game1.hasPlayer2(function(current) {
                        if (event1.name == "gain" && event1.player == current) return false;
                        var evt = event1.getl(current);
                        return evt && evt.hs && evt.hs.some(function(value) {
                            return get.number(value) == 13;
                        });
                    }));
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_targets;
                    if (event1.triggername == "washCard") {
                        var _$name = event1.name;
                        player1.logSkill(_$name);
                        player1.trySkillAnimate(`${_$name}_rewrite`, _$name, player1.checkShow(_$name));
                        if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_gold")) {
                            lib.config.extension_桌面大战_unlocked_characters.push("avn_gold");
                            game1.saveConfig("extension_桌面大战_unlocked_characters", lib.config.extension_桌面大战_unlocked_characters);
                            game1.broadcastAll(function(skill) {
                                lib.characterIntro.avn_king_orange = `武将作者：Show-K<br>
									插图作者：Alan Becker<br>
									<hr>
									AvN11. 橙国王/King Orange<br>
									首次登场：<ruby>火柴人VS我的世界系列 第二十二集 跑酷<rp>（</rp><rt>Parkour - AVM Shorts Episode 22</rt><rp>）</rp></ruby><br>
									首次在衍生系列《火柴人VS我的世界系列》第三季第三集登场，为一位戴着皇冠的深橙色火柴人，身型庞大。过往大致不明。拥有一个装置著命令方块的棕红色权杖，透过命令方块的力量可以实现任何他心之所想，希望有朝一日能够控制住《我的世界》，因此命令紫抢走创造能力，并且将再临者、红、绿、蓝、黄五人囚禁于跑酷世界。绿破解后，被关入牢里，连猪被关入，并于第四集找上黄和蓝。第六集他在艾伦电脑偷得了《我的世界》，不仅取得了创造能力，还使五人的物品完全消失，但是最后再临者用来自AlexCrafter28的电脑的《我的世界》打败了他，但被再临者的一个非常强壮的监守者而被打至重伤，但最后拿了创造方块，他的控制命令方块的支柱还在再临者手上，第七集被监守者、再临者、红和他的队友们合作来阻止他，最后红用下界合金砖装在支柱上后把他打飞，但是他又回来了，并且身上有两个《我的世界》。并与再临者等人决战，召唤众人的黑暗体，击败众人后融合两个《我的世界》。<br>
									——《维基百科》<br>
									<hr>
									再也不想失去任何人了。再也不能失去任何人了。`;
                                lib.skill[skill].derivation = `${skill}_rewrite`;
                                lib.translate[`${skill}_info`] = "锁定技，当一名角色正面朝上失去点数为K的牌后，若你本回合未因你的〖抵倾〗摸过牌，则摸已损失的体力张牌（至少一张）；牌堆洗牌后，你修改〖抵倾〗。";
                            }, _$name);
                        }
                        player1.storage[_$name] = true;
                        player1.markSkill(_$name);
                        game1.log(player1, "修改了技能", `#g【${get.skillTranslation(_$name, player1)}】`);
                        event1.finish();
                    } else {
                        var numberOfCardsBeingDrawn = Math.max(player1.maxHp - player1.hp, 1);
                        if (player1.storage[name]) player1.chooseTarget(`${get.skillTranslation(event1.name, player1)}：令一名角色摸${get.cnNumber(numberOfCardsBeingDrawn)}张牌`, true).ai = function(target) {
                            return get.sgnAttitude(_status.event.player, target);
                        };
                        else {
                            player1.logSkill(event1.name);
                            player1.draw(numberOfCardsBeingDrawn, "nodelay");
                            event1.finish();
                        }
                    }
                    "step 1";
                    if ((_result_targets = result1.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var target1 = result1.targets[0];
                        player1.logSkill(event1.name, target1);
                        if (target1 != player1) player1.addExpose(0.2);
                        target1.draw(Math.max(player1.maxHp - player1.hp, 1), "nodelay");
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
                filter: function(event1, player1) {
                    return player1.hasCard(function(card) {
                        return lib.filter.cardDiscardable(card, player1);
                    }, "he");
                },
                position: "he",
                filterCard: true,
                check: function(card) {
                    return 6 - get.useful(card);
                },
                content: function(event1, step, source, player1, target, targets, card, cards, skill, forced, num, trigger, result1) {
                    "step 0";
                    var _result_links;
                    var topCardsOfThePile = event1.cards = get.cards(10);
                    topCardsOfThePile.forEach(function(value) {
                        return ui.cardPile.insertBefore(value, ui.cardPile.firstChild);
                    });
                    game1.updateRoundNumber();
                    player1.showCards(topCardsOfThePile, `${get.translation(player1)}发动了【${get.skillTranslation(event1.name, player1)}】`);
                    "step 1";
                    player1.chooseCardButton(`${get.skillTranslation(event1.name, player1)}：你可以获得${get.translation(cards)}${cards.length > 1 ? "中的一张牌" : ""}`, cards).ai = function(button) {
                        return _status.event.player.getUseValue(button.link, true, true);
                    };
                    "step 2";
                    if ((_result_links = result1.links) === null || _result_links === void 0 ? void 0 : _result_links.length) player1.gain(result1.links, "gain2");
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
                    global: [
                        "loseAfter",
                        "cardsDiscardAfter",
                        "loseAsyncAfter",
                        "equipAfter"
                    ]
                },
                filter: function(event1, player1, name1) {
                    return name1 == "phaseZhunbeiBegin" || event1.getd().some(function(card) {
                        return get.cardtag(card, "gifts");
                    });
                },
                content: function() {
                    "step 0";
                    var _result_targets;
                    player.chooseTarget(get.prompt2("ska_zhenhan"), lib.filter.notMe).set("targetprompt", function(target) {
                        return get.distance(_status.event.player, target) > 1 ? "距离-1" : "失去体力";
                    }).ai = function(target) {
                        if (get.distance(_status.event.player, target) > 1) return -get.attitude(_status.event.player, target);
                        return get.effect(target, {
                            name: "losehp"
                        }, _status.event.player, _status.event.player);
                    };
                    "step 1";
                    if ((_result_targets = result.targets) === null || _result_targets === void 0 ? void 0 : _result_targets.length) {
                        var target = result.targets[0];
                        player.logSkill("ska_zhenhan", target);
                        if (get.distance(player, target) > 1) {
                            player.addSkill("ska_zhenhan_effect");
                            if (typeof player.storage.ska_zhenhan_effect[target.playerid] != "number") player.storage.ska_zhenhan_effect[target.playerid] = 1;
                            else player.storage.ska_zhenhan_effect[target.playerid]++;
                            player.markSkill("ska_zhenhan_effect");
                            event.finish();
                        } else target.loseHp();
                    } else event.finish();
                    "step 2";
                    player.removeSkill("ska_zhenhan_effect");
                },
                ai: {
                    expose: 0.2
                }
            },
            ska_zhenhan_effect: {
                charlotte: true,
                init: function(player1) {
                    if (typeof player1.storage.ska_zhenhan_effect != "object") player1.storage.ska_zhenhan_effect = {};
                },
                onremove: true,
                intro: {
                    content: function(storage) {
                        return game1.filterPlayer2(function(current) {
                            return typeof storage[current.playerid] == "number";
                        }).sortBySeat(_status.currentPhase).map(function(current) {
                            return `你本局游戏计算与${get.translation(current)}的距离-${storage[current.playerid]}`;
                        }).join("<br>");
                    },
                    markcount: function(storage) {
                        return Object.values(storage).reduce(function(previousValue, currentValue) {
                            return previousValue + currentValue;
                        }, 0);
                    }
                },
                mod: {
                    globalFrom: function(from, to, distance) {
                        if (typeof from.storage.ska_zhenhan_effect == "object" && typeof from.storage.ska_zhenhan_effect[to.playerid] == "number") return distance - from.storage.ska_zhenhan_effect[to.playerid];
                    }
                }
            }
        },
        dynamicTranslate: {
            avn_ascending: function(player1) {
                return lib.config.extension_桌面大战_unlocked_characters.contains("avn_dark_blue") || lib.config.extension_桌面大战_unlocked_characters.contains("avn_pink") ? player1.storage.avn_ascending ? "锁定技，当你于一回合内使用非第一张牌时，若本回合使用过的所有牌的点数为严格递增，则令一名角色摸一张牌，否则本回合〖攀铭〗失效且令一名角色本回合不能使用或打出牌。" : "锁定技，当你于一回合内使用非第一张牌时，若本回合使用过的所有牌的点数为严格递增，则摸一张牌，否则本回合〖攀铭〗失效且不能使用或打出牌；若你因回合外摸牌而获得牌的次数不小于体力值，则你修改〖攀铭〗。" : "锁定技，当你于一回合内使用非第一张牌时，若本回合使用过的所有牌的点数为严格递增，则摸一张牌，否则本回合〖攀铭〗失效且不能使用或打出牌。";
            },
            avn_resistant: function(player1) {
                return lib.config.extension_桌面大战_unlocked_characters.contains("avn_gold") ? player1.storage.avn_resistant ? "锁定技，当一名角色正面朝上失去点数为K的牌后，若没有角色本回合因你的〖抵倾〗摸过牌，则你令一名角色摸你已损失的体力张牌（至少一张）。" : "锁定技，当一名角色正面朝上失去点数为K的牌后，若你本回合未因你的〖抵倾〗摸过牌，则摸已损失的体力张牌（至少一张）；牌堆洗牌后，你修改〖抵倾〗。" : "锁定技，当一名角色正面朝上失去点数为K的牌后，若你本回合未因你的〖抵倾〗摸过牌，则摸已损失的体力张牌（至少一张）。";
            }
        },
        characterReplace: {
            avn_the_second_coming: [
                "avn_the_second_coming",
                "avn_the_second_coming_the_chosen_one_s_return"
            ],
            avn_purple: [
                "avn_purple",
                "avn_dark_blue",
                "avn_pink"
            ],
            avn_king_orange: [
                "avn_king_orange",
                "avn_gold"
            ]
        },
        translate: {
            // Animator vs. Animation
            avn_animator_vs_animation: "火柴人VS动画师",
            // Alan Becker
            avn_alan_becker: "艾伦\xb7贝克尔",
            avn_alan_becker_ab: "艾伦贝克尔",
            avn_animate: "赋名",
            avn_animate_effect: "赋名",
            avn_animate_info: "出牌阶段限一次，你可以展示一张基本牌或普通锦囊牌，令一名角色至多其体力值张手牌均视为此牌，直到其使用这些牌中的一张结算/回合结束后。",
            // Victim
            avn_victim: "受害者",
            avn_adaptive: "应识",
            avn_adaptive_info: "每回合限一次，你可以展示所有手牌，并将一张牌当做上一张被使用的基本牌或普通锦囊牌使用或打出（无距离和次数限制）。",
            // The Chosen One
            avn_the_chosen_one: "天选之子",
            avn_overflow: "超限",
            avn_overflow_backup: "超限",
            avn_overflow_info: "出牌阶段开始时，你可以展示所有手牌并弃置一种花色的所有牌（至少一张），对一名角色造成1点属性伤害。",
            // The Dark Lord
            avn_the_dark_lord: "黑暗领主",
            avn_terminal: "终解",
            avn_terminal_info: "出牌阶段结束时，你可以展示一名角色的所有手牌，然后你可以弃置其中一种花色的所有牌。",
            // The Second Coming
            avn_the_second_coming: "再临者",
            avn_passionate: "炽觉",
            avn_passionate_info: "出牌阶段限一次，你可以展示一名角色的一张手牌。若展示牌为红/黑色，则你可以令一名角色摸/弃置一张牌。若展示牌与上一张的颜色不同，则你可以再令一名角色执行另一项。",
            // The Second Coming (The Chosen One's Return)
            avn_the_second_coming_the_chosen_one_s_return: "再临者",
            avn_awakening: "决唤",
            avn_awakening_info: "出牌阶段限一次，你可以展示一名角色的所有手牌，然后你可以选择一项：1. 令其弃置所有红色手牌，然后回复1点体力；2. 令其摸黑色手牌数量张牌，然后失去1点体力。",
            // Red
            avn_red: "红",
            avn_combative: "攻端",
            avn_combative_info: "当有牌被抵消后，你可以将区域内的一张红色牌置于武将牌上，视为使用一张【决斗】；当你受到伤害后，你可以将武将牌上至多伤害值张牌交给一名角色。",
            // Green
            avn_green: "绿",
            avn_progressive: "筑韵",
            avn_progressive_info: "当你使用一张牌时，若你使用过的上上一张、上一张、此牌的点数为单调递增/减，则你可以弃置任意张牌，令至多X+1名角色各摸一张牌（X为弃置的牌数）。",
            // Blue
            avn_blue: "蓝",
            avn_midas_touch: "点金",
            avn_midas_touch_info: "一名角色的结束阶段，若你本回合使用或打出过♣牌，则你可以亮出牌堆顶三张牌，令至多三名角色可以依次获得亮出牌中的一张。",
            // Yellow
            avn_yellow: "黄",
            avn_technological: "械能",
            avn_technological_info: "每轮限一次，回合结束时，若本回合进入弃牌堆的牌的名称字数之和为2的自然数次方，则你可以令一名角色执行一个额外回合。",
            // Animation vs. Minecraft
            avn_animation_vs_minecraft: "火柴人VS我的世界",
            // Herobrine
            avn_herobrine: "Herobrine",
            avn_herobrine_ab: "HRBRN",
            avn_out_of_context: "异造",
            avn_out_of_context_effect: "异造",
            avn_out_of_context_info: "当你扣减体力时，你可以将区域内的至多六张牌置入仁库。若如此做，本回合结束后，你将仁库中的等量牌交给一名角色；当有牌移出/入游戏后，你可以将弃牌堆底的一张牌交给一名角色。",
            // Purple
            avn_purple: "紫",
            avn_ascending: "攀铭",
            avn_ascending_invalid: "失效",
            avn_ascending_effect: "攀铭",
            avn_ascending_info: "锁定技，当你于一回合内使用非第一张牌时，若本回合使用过的所有牌的点数为严格递增，则摸一张牌，否则本回合〖攀铭〗失效且不能使用或打出牌；若你因回合外摸牌而获得牌的次数不小于体力值，则修改〖攀铭〗。",
            avn_ascending_rewrite: "攀铭\xb7改",
            avn_ascending_rewrite_info: "锁定技，当你于一回合内使用非第一张牌时，若本回合使用过的所有牌的点数为严格递增，则令一名角色摸一张牌，否则本回合〖攀铭〗失效且令一名角色本回合不能使用或打出牌。",
            // Dark Blue
            avn_dark_blue: "深蓝",
            // Pink
            avn_pink: "粉",
            // King Orange
            avn_king_orange: "橙国王",
            avn_resistant: "抵倾",
            avn_resistant_info: "锁定技，当一名角色正面朝上失去点数为K的牌后，若你本回合未因你的〖抵倾〗摸过牌，则摸已损失的体力张牌（至少一张）；牌堆洗牌后，你修改〖抵倾〗。",
            avn_resistant_rewrite: "抵倾\xb7改",
            avn_resistant_rewrite_info: "锁定技，当一名角色正面朝上失去点数为K的牌后，若本回合没有角色因你的〖抵倾〗摸过牌，则你令一名角色摸你已损失的体力张牌（至少一张）。",
            // Gold
            avn_gold: "金",
            // Alexcrafter28
            avn_alexcrafter28: "Alexcrafter28",
            avn_alexcrafter28_ab: "Alex",
            avn_encounter: "探遇",
            avn_encounter_info: "出牌阶段限一次，你可以弃置一张牌，展示牌堆顶十张牌，然后你可以获得其中的一张牌。",
            // Warden
            ska_warden: "监守者",
            ska_zhenhan: "振撼",
            ska_zhenhan_effect: "振撼",
            ska_zhenhan_info: "准备阶段，或带有「赠」标签的牌进入弃牌堆后，你可以令你本局游戏计算与一名其他角色的距离-1。若你与其距离为1，则改为令其失去1点体力并重置距离计算。"
        },
        help: {}
    };
    if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_dark_blue") && !lib.config.extension_桌面大战_unlocked_characters.contains("avn_pink")) {
        ANIMATION_VS_NONAME.characterIntro.avn_purple = `武将作者：Show-K<br>
			插图作者：Alan Becker<br>
			<hr>
			AvN10. 紫/Purple<br>
			首次登场：<ruby>火柴人VS我的世界系列 第八集（The Nether）<rp>（</rp><rt>The Nether - AVM Shorts Episode 8</rt><rp>）</rp></ruby><br>
			似乎来自其他使用者的电脑，性格自私。首次登场于衍生系列作品《火柴人VS我的世界系列》第一季第九集，与绿和蓝进入末地讨伐末影龙，途中却背叛蓝和绿并在取走龙蛋后回到电脑，最后因将末影龙引入村庄中而被村民们关进监狱里。在短片《火柴人VS英雄联盟》与再临者一行人和解。<br>
			于《火柴人VS我的世界系列》第三季第三集再度登场，紫把再临者一行人带到跑酷世界中，而后却指使猪灵蛮兵囚禁五人。实际上成为了橙国王的手下，并被奉命要马上为他得到创造模式能力，以统治《我的世界》世界。<br>
			最后遭到出卖，在战斗时放弃了统治《我的世界》。与绿在另外的下界门走出世界。<br>
			——《维基百科》<br>
			<hr>
			努力得到认可。`;
        delete ANIMATION_VS_NONAME.skill.avn_ascending.derivation;
        ANIMATION_VS_NONAME.translate.avn_ascending_info = "锁定技，当你于一回合内使用非第一张牌时，若本回合使用过的所有牌的点数为严格递增，则摸一张牌，否则本回合〖攀铭〗失效且不能使用或打出牌。";
    }
    if (!lib.config.extension_桌面大战_unlocked_characters.contains("avn_gold")) {
        ANIMATION_VS_NONAME.characterIntro.avn_king_orange = `武将作者：Show-K<br>
			插图作者：Alan Becker<br>
			<hr>
			AvN11. 橙国王/King Orange<br>
			首次登场：<ruby>火柴人VS我的世界系列 第二十二集 跑酷<rp>（</rp><rt>Parkour - AVM Shorts Episode 22</rt><rp>）</rp></ruby><br>
			首次在衍生系列《火柴人VS我的世界系列》第三季第三集登场，为一位戴着皇冠的深橙色火柴人，身型庞大。过往大致不明。拥有一个装置著命令方块的棕红色权杖，透过命令方块的力量可以实现任何他心之所想，希望有朝一日能够控制住《我的世界》，因此命令紫抢走创造能力，并且将再临者、红、绿、蓝、黄五人囚禁于跑酷世界。绿破解后，被关入牢里，连猪被关入，并于第四集找上黄和蓝。第六集他在艾伦电脑偷得了《我的世界》，不仅取得了创造能力，还使五人的物品完全消失，但是最后再临者用来自AlexCrafter28的电脑的《我的世界》打败了他，但被再临者的一个非常强壮的监守者而被打至重伤，但最后拿了创造方块，他的控制命令方块的支柱还在再临者手上，第七集被监守者、再临者、红和他的队友们合作来阻止他，最后红用下界合金砖装在支柱上后把他打飞，但是他又回来了，并且身上有两个《我的世界》。并与再临者等人决战，召唤众人的黑暗体，击败众人后融合两个《我的世界》。<br>
			——《维基百科》<br>
			<hr>
			再也不想输给任何人了。再也不能输给任何人了。`;
        delete ANIMATION_VS_NONAME.skill.avn_resistant.derivation;
        ANIMATION_VS_NONAME.translate.avn_resistant_info = "锁定技，当一名角色正面朝上失去点数为K的牌后，若你本回合未因你的〖抵倾〗摸过牌，则摸已损失的体力张牌（至少一张）。";
    }
    if (lib.config.game == "super_smash_tabletop") {
        delete ANIMATION_VS_NONAME.character.ska_warden;
        ANIMATION_VS_NONAME.characterSort.animation_vs_noname.avn_animation_vs_minecraft.remove("ska_warden");
        delete ANIMATION_VS_NONAME.characterIntro.ska_warden;
        delete ANIMATION_VS_NONAME.characterTitle.ska_warden;
        lib.perfectPair.ska_warden.push(...ANIMATION_VS_NONAME.perfectPair.ska_warden);
        delete ANIMATION_VS_NONAME.perfectPair.ska_warden;
        delete ANIMATION_VS_NONAME.skill.ska_zhenhan;
        delete ANIMATION_VS_NONAME.skill.ska_zhenhan_effect;
        delete ANIMATION_VS_NONAME.translate.ska_warden;
        delete ANIMATION_VS_NONAME.translate.ska_zhenhan;
        delete ANIMATION_VS_NONAME.translate.ska_zhenhan_effect;
        delete ANIMATION_VS_NONAME.translate.ska_zhenhan_info;
    }
    if (lib.device || lib.node) for(var character in ANIMATION_VS_NONAME.character){
        ANIMATION_VS_NONAME.character[character][4].push(`ext:桌面大战/image/character/${character}.webp`);
    }
    else for(var character1 in ANIMATION_VS_NONAME.character){
        ANIMATION_VS_NONAME.character[character1][4].push(`db:extension-桌面大战:image/character/${character1}.webp`);
    }
    if (lib.config.game == "super_smash_tabletop") for(var character2 in ANIMATION_VS_NONAME.character){
        if (character2 == "avn_alan_becker" || character2 == "avn_alexcrafter28") ANIMATION_VS_NONAME.character[character2][1] = "sst_reality";
        ANIMATION_VS_NONAME.character[character2][1] = "sst_spirit";
    }
    for(var character3 in ANIMATION_VS_NONAME.character){
        if (character3 != "avn_alan_becker" && character3 != "avn_alexcrafter28" && character3 != "ska_warden" && !lib.config.extension_桌面大战_unlocked_characters.contains(character3)) ANIMATION_VS_NONAME.character[character3][4].push("unseen");
    }
    return ANIMATION_VS_NONAME;
});

