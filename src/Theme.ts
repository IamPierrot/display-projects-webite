interface Theme {
    backgroudColor: string
    cardColor: string
    titleColor: string
    contentColor: string
    buttonColor: string
}

const ColorDark: Theme = {
    backgroudColor: 'bg-slate-800',
    cardColor: 'bg-slate-200',
    titleColor: 'text-slate-50',
    contentColor: 'text-slate-300',
    buttonColor: "bg-cyan-600"
}

const ColorLight: Theme = {
    backgroudColor: 'bg-white',
    cardColor: 'bg-slate-100',
    titleColor: 'text-slate-900',
    contentColor: 'text-slate-500',
    buttonColor: "bg-cyan-600"
}

export const getTheme = (typeTheme: "Dark" | "Light") => {
    let Theme: Theme;
    if (typeTheme === "Dark") {
        Theme = ColorDark;
    } else if (typeTheme === "Light") {
        Theme = ColorLight;
    } else {
        throw Error("Invalid theme!");
    }

    return Theme;
}

