import type { Operative, WeaponProfile } from "../killteamjson"

function joinUnique(arr: string[]) {
    return Array.from(new Set(arr.flatMap(s => (s ?? "").split(",").map(x => x.trim()).filter(Boolean))))
}

function renderWRForProfile(p: WeaponProfile) {
    return p.WR && p.WR.trim() !== "" ? p.WR : "—"
}

export default function OperativeCard({ operative }: { operative: Operative }) {
    if (!operative) {
        return (
            <article className="w-full max-w-5xl mx-auto flex flex-col aspect-3/1 bg-surface text-foreground rounded-lg shadow-lg ring-1 ring-border overflow-hidden">
                <div className="flex justify-between items-center gap-4 bg-header-bg text-header-text border-b-4 border-primary p-4">
                    <h2 className="text-xl font-bold uppercase">Guess Preview</h2>
                </div>
                <div className="flex grow items-center justify-center text-foreground/70">
                    This is a preview of the operative you're about to guess.
                </div>
            </article>
        )
    }

    const weaponProfiles = operative.weapons.flatMap(w => w.profiles.map(p => ({ wepName: w.wepName, profile: p })))

    return (
        <article className="w-full max-w-5xl mx-auto bg-surface text-foreground rounded-lg shadow-lg ring-1 ring-border overflow-hidden">
            {/* Top band */}
            <div className="flex justify-between items-center gap-4 flex-wrap
        bg-header-bg text-header-text border-b-4 border-primary p-4">
                <h2 className="text-xl font-bold uppercase">{operative.opTypeName}</h2>

                {/* Stat badges */}
                <div className="flex gap-2 items-center">
                    <div className="flex flex-col items-center p-2 bg-background rounded border border-border">
                        <span className="text-xs text-foreground/70">APL</span>
                        <span className="text-lg font-bold text-primary">{operative.APL}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-background rounded border border-border">
                        <span className="text-xs text-foreground/70">MOVE</span>
                        <span className="text-lg font-bold text-primary">{operative.MOVE}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-background rounded border border-border">
                        <span className="text-xs text-foreground/70">SAVE</span>
                        <span className="text-lg font-bold text-primary">{operative.SAVE}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-background rounded border border-border">
                        <span className="text-xs text-foreground/70">WOUNDS</span>
                        <span className="text-lg font-bold text-primary">{operative.WOUNDS}</span>
                    </div>
                </div>
            </div>

            {/* Weapons table */}
            <section className="p-4">
                <table className="w-full rounded-md text-center">
                    <thead>
                        <tr className="bg-background text-sm text-foreground/80 uppercase font-semibold px-4 py-2 items-center border border-border">
                            <th className="py-2">NAME</th>
                            <th className="py-2">ATK</th>
                            <th className="py-2">HIT</th>
                            <th className="py-2">DMG</th>
                            <th className="py-2">Weapon Rules</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border border-x border-b border-border">
                        {weaponProfiles.map(({ wepName, profile }) => (
                            <tr key={profile.wepprofileId} className="hover:bg-background/50 transition-colors">
                                <td className="py-2 px-1">{wepName}</td>
                                <td className="py-2 px-1">{profile.ATK}</td>
                                <td className="py-2 px-1">{profile.HIT}</td>
                                <td className="py-2 px-1">{profile.DMG}</td>
                                <td className="py-2 px-1">{renderWRForProfile(profile)}</td>
                            </tr>
                        ))}
                    </tbody>

                    {operative.weapons.length === 0 && (
                        <div className="px-4 py-4 text-sm text-foreground/60">No weapons listed</div>
                    )}
                </table>
            </section>

            {/* Abilities / Options / Footer */}
            <section className="px-4 pb-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground mb-2 opacity-90">Abilities & Faction Rules</h3>
                        <div className="space-y-3 text-sm text-foreground/80">
                            {operative.abilities.length > 0 ? operative.abilities.map(a => (
                                <div key={a.abilityId}>
                                    <div className="font-semibold text-foreground">{a.abilityName}{a.AP !== null ? ` — ${a.AP}` : ""}</div>
                                    {/* <div className="text-gray-300">{a.description}</div> */}
                                </div>
                            )) : <div className="text-foreground/60">No abilities</div>}
                        </div>
                    </div>
                </div>

                <footer className="mt-4 pt-4 border-t border-border text-xs text-foreground/60 flex items-center justify-between">
                    <p className="text-xs text-foreground/80 mt-1">{operative.keywords}</p>
                </footer>
            </section>
        </article>
    )
}