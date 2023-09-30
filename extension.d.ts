declare interface Game {
	getExtensionConfig(extension: "桌面大战", key: "confirmed_unlocked_characters" | "unlocked_characters"): string[];
	import(type: "extension", content: (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) => AnimationVsNonameExtensionInfoConfigData): void;
	lockTheSecondComingTheChosenOneReturn(): void;
	unlockAllAnimationVsNonameCharacters(): void;
	unlockAllAnimationVsNonameCharactersExceptHidden(): void;
}
declare interface Lib {
	avnCharacterTitle: SMap<string>;
	avnHiddenCharacters: Set<string>;
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
		avn_cookery: ExEventSkillData<AVNCookeryExEvent>;
		avn_encounter: AVNEncounterExSkillData;
		avn_encounter_backup: AVNEncounterBackupExSkillData;
		avn_frame_by_frame_drawing: AVNFrameByFrameDrawingExSkillData;
		avn_frame_by_frame_drawing_backup?: AVNFrameByFrameDrawingBackupExSkillData;
		avn_mathematics: AVNMathematicsExSkillData;
		avn_mathematics_backup: AVNMathematicsBackupExSkillData;
		avn_overflow: ExEventSkillData<AVNOverflowExEvent>;
		avn_resistant: AVNResistantExSkillData;
		avn_surpression: AVNSurpressionExSkillData;
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
		avn_adaptive?: true;
	};
}
interface AVNAdaptiveExModData extends ExModData {
	targetInRange(card: AVNAdaptiveCard): true | void;
	cardUsable(card: AVNAdaptiveCard): number | void;
}
interface AVNAdaptiveExSkillData extends ExEventSkillData<ExEvent<"avn_adaptive">> {
	chooseButton: ExChooseButtonConfigData<Card, AVNAdaptiveBackupExSkillData>;
	mod: AVNAdaptiveExModData;
}
interface AVNAscendingExSkillData extends ExEventSkillData<ExEvent<"avn_ascending">> {
	isNotAvailable(player: Player): boolean;
}
interface AVNCookeryExEvent extends ExEvent<"avn_cookery"> {
	targetsIndex: number;
}
interface AVNDynamicLinkExSkillData extends ExEventSkillData<ExEvent<"_avn_dynamic_link">> {
	changeMain: AVNDynamicLinkContentFuncByAll;
	changeVice: AVNDynamicLinkContentFuncByAll;
	initList: NoneParmFum<void>;
	initVice: AVNDynamicLinkContentFuncByAll;
}
interface AVNEncounterBackupExSkillData extends ExEventSkillData<AVNEncounterExEvent> {
	control: string;
}
interface AVNEncounterExEvent extends ExEvent<"avn_encounter_backup"> {
	controlTranslation: string;
}
interface AVNEncounterExSkillData extends ExEventSkillData<ExEvent<"avn_encounter">> {
	chooseButton: ExChooseControlButtonConfigData<AVNEncounterBackupExSkillData>;
}
interface AVNFrameByFrameDrawingBackupExSkillData extends ExEventSkillData<ExEvent<"avn_frame_by_frame_drawing_backup">> {
	selectedCard: Card;
}
interface AVNFrameByFrameDrawingExSkillData extends ExEventSkillData<ExEvent<"avn_frame_by_frame_drawing">> {
	chooseButton: ExChooseButtonConfigData<Card, AVNFrameByFrameDrawingBackupExSkillData>;
	isNotValidConversionResult(player: Player, card: Card): boolean;
	isNumberNotLessThanPreviousConvertedCard(player: Player, card: Card): boolean;
	isSuitAndTypeAndLengthDifferentFrom(card: Card, anotherCard: Card): boolean;
	isConvertable(player: Player, card: Card, conversionResult: Card): boolean;
}
interface AVNMathematicsBackupExSkillData extends ExEventSkillData<ExEvent<"avn_mathematics_backup">> {
	bestCombination: Card[];
}
interface AVNMathematicsExSkillData extends ExEventSkillData<ExEvent<"avn_mathematics">> {
	chooseButton: ExChooseButtonConfigData<string[], AVNMathematicsBackupExSkillData>;
	getAvailableCombinationsPrompt(player: Player): string;
	getCombinations<T>(array: T[], k: number, prefix?: T[]): T[][];
	hasValidCombination(player: Player, numbers: number[]): boolean;
	isValidNumber(card: Card, player: Player): boolean;
}
interface AVNResistantExSkillData extends ExEventSkillData<ExEvent<"avn_resistant">> {
	isNotAvailable(player: Player): boolean;
}
interface AVNSurpressionExSkillData extends ExEventSkillData<ExEvent<"avn_resistant">> {
	convertableCards: string[];
}
interface AnimationVsNonameImportCharacterConfig extends importCharacterConfig {
	skill: Lib.Skill;
}
interface AnimationVsNonamePackageData extends PackageData {
	changeLog?: string;
}
interface AVNOverflowExEvent extends ExEvent<"avn_overflow"> {
	giftableCards: Card[];
	giftingTarget: Target;
};
interface ExChooseButtonConfigData<T, E extends ExEventSkillData<ExEvent<string>>> extends ChooseButtonConfigData {
	backup?(links?: T[], player?: Player): E;
	check?(button?: Button): number;
	prompt?(links?: T[], player?: Player): string;
}
interface ExChooseControlButtonConfigData<T extends ExEventSkillData<ExEvent<string>>> extends ChooseButtonConfigData {
	backup?(result?: BaseCommonResultData, player?: Player): T;
	check?(event?: GameEvent, player?: Player): number | string;
	prompt?(result?: BaseCommonResultData, player?: Player): string;
}
interface ExEvent<T extends string> extends GameEvent {
	name: T;
}
interface ExEventSkillData<T extends ExEvent<string>> extends ExSkillData {
	content: (event: T, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: string, forced: boolean, num: number, trigger: GameEvent, result: BaseCommonResultData) => void;
}
type AVNDynamicLinkContentFuncByAll = (event: GameEvent, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: "_avn_dynamic_link", forced: boolean, num: number, trigger: GameEvent, result: BaseCommonResultData) => void;
