declare const Resource: Readonly<{
    Static: {
        Title: {
            Bg: string;
        };
        Magic: string;
        Mushimegane: string;
        BattleBgFores: string[];
        BattleBgMiddles: string[];
        BattleBgBacks: string[];
        Audio: {
            Bgm: {
                Title: string;
                CombineScene: string;
            };
            SE: {
                onCircle: string;
                onCombine: string;
                onClear: string;
            };
        };
    };
    FontFamily: {
        Default: string;
    };
}>;
export default Resource;
