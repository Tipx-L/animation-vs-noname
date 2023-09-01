interface AnimationVsNonameConfig {
	confirmed_unlocked_characters?: string[];
	enable?: true;
	imported?: true;
	unlocked_characters?: string[];
};
interface AnimationVsNonameExtensionInfoConfigData extends ExtensionInfoConfigData {
	content(config: AnimationVsNonameConfig, pack: AnimationVsNonamePackageData): void;
	name: "桌面大战";
	package: AnimationVsNonamePackageData;
	precontent(data: AnimationVsNonameConfig): void;
};
interface AnimationVsNonamePackageData extends PackageData {
	changeLog?: string;
};
interface Game {
	getExtensionConfig(extension: "桌面大战", key: "confirmed_unlocked_characters" | "unlocked_characters"): string[];
	import(type: "extension", content: (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) => AnimationVsNonameExtensionInfoConfigData): void;
};
interface Lib {
	avnCharacterTitle: SMap<string>;
};
