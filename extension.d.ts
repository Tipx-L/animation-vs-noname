declare interface Game {
	getExtensionConfig(extension: "桌面大战", key: "confirmed_unlocked_characters" | "unlocked_characters"): string[];
	import(type: "extension", content: (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) => AnimationVsNonameExtensionInfoConfigData): void;
}
declare interface Lib {
	avnCharacterTitle: SMap<string>;
}
declare interface PlayerStorage {
	avn_ascending: boolean;
	avn_resistant: boolean;
}
declare namespace Lib {
	interface Skill {
		_avn_dynamic_link: AVNDynamicLinkExSkillData;
		avn_ascending: AVNAscendingExSkillData;
		avn_adaptive: AVNAdaptiveExSkillData;
		avn_adaptive_backup?: AVNAdaptiveBackupExSkillData;
		avn_frame_by_frame_drawing: AVNFrameByFrameDrawingExSkillData;
		avn_frame_by_frame_drawing_backup?: AVNFrameByFrameDrawingBackupExSkillData;
		avn_overflow: ExEventSkillData<AVNOverflowEvent>;
		avn_resistant: AVNResistantExSkillData;
	}
}
interface AnimationVsNonameConfig {
	confirmed_unlocked_characters?: string[];
	enable?: true;
	imported?: true;
	unlocked_characters?: string[];
}
interface AnimationVsNonameExtensionInfoConfigData extends ExtensionInfoConfigData {
	content(config: AnimationVsNonameConfig, pack: AnimationVsNonamePackageData): void;
	name: "桌面大战";
	package: AnimationVsNonamePackageData;
	precontent(data: AnimationVsNonameConfig): void;
}
interface AVNAdaptiveBackupExSkillData extends ExEventSkillData<ExEvent<"avn_adaptive_backup">> {
	viewAs: AVNAdaptiveCard;
	shownCard: Card;
}
interface AVNAdaptiveCard extends Card {
	storage?: {
		avn_adaptive?: true
	}
}
interface AVNAdaptiveExModData extends ExModData {
	targetInRange(card: AVNAdaptiveCard): true | void;
	cardUsable(card: AVNAdaptiveCard): number | void;
}
interface AVNAdaptiveExSkillData extends ExEventSkillData<ExEvent<"avn_adaptive">> {
	chooseButton: ExChooseButtonConfigData<AVNAdaptiveBackupExSkillData>;
	mod: AVNAdaptiveExModData;
}
interface AVNAscendingExSkillData extends ExEventSkillData<ExEvent<"avn_ascending">> {
	isNotAvailable(player: Player): boolean;
}
interface AVNDynamicLinkExSkillData extends ExEventSkillData<ExEvent<"_avn_dynamic_link">> {
	changeMain: AVNDynamicLinkContentFuncByAll;
	changeVice: AVNDynamicLinkContentFuncByAll;
	initList: NoneParmFum<void>;
	initVice: AVNDynamicLinkContentFuncByAll;
}
interface AVNFrameByFrameDrawingBackupExSkillData extends ExEventSkillData<ExEvent<"avn_frame_by_frame_drawing_backup">> {
	selectedCard: Card;
}
interface AVNFrameByFrameDrawingExSkillData extends ExEventSkillData<ExEvent<"avn_frame_by_frame_drawing">> {
	chooseButton: ExChooseButtonConfigData<AVNFrameByFrameDrawingBackupExSkillData>;
	hasNotConvertedThisRound(player: Player, name: string): boolean;
	isNotValidConversionResult(player: Player, card: Card): boolean;
	isNumberNotLessThanPreviousConvertedCard(player: Player, card: Card): boolean;
	isSuitOrTypeDifferentFrom(card: Card, anotherCard: Card): boolean;
	isConvertable(player: Player, card: Card, conversionResult: Card): boolean;
}
interface AVNResistantExSkillData extends ExEventSkillData<ExEvent<"avn_resistant">> {
	isNotAvailable(player: Player): boolean;
}
interface AnimationVsNonameImportCharacterConfig extends importCharacterConfig {
	skill: Lib.Skill;
}
interface AnimationVsNonamePackageData extends PackageData {
	changeLog?: string;
}
interface AVNOverflowEvent extends ExEvent<"avn_overflow"> {
	giftableCards: Card[];
	giftingTarget: Target;
};
interface ExChooseButtonConfigData<T extends ExEventSkillData<ExEvent<string>>> extends ChooseButtonConfigData {
	backup(links: Card[], player: Player): T;
	prompt(links: Card[], player: Player): string;
}
interface ExEvent<T extends string> extends GameEvent {
	name: T;
}
interface ExEventSkillData<T extends ExEvent<string>> extends ExSkillData {
	content: (event: T, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: string, forced: boolean, num: number, trigger: GameEvent, result: BaseCommonResultData) => void;
}
type AVNDynamicLinkContentFuncByAll = (event: GameEvent, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: "_avn_dynamic_link", forced: boolean, num: number, trigger: GameEvent, result: BaseCommonResultData) => void;
