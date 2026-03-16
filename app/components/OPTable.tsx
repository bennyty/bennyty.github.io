import { useEffect, useState } from "react";
import { Operative } from "../killteamjson";
import { getSanitizedWR, operatives } from "../Team";
import { compareArrays, getAbilities, getArchetypes, getKeywords, getWeaponDamages, getWeaponTraits, toNumber } from "../util";


export default function OPTable({ correctOperative, guesses }: { correctOperative: Operative, guesses: string[] }) {
  const cellStyles = "p-1 lg:p-2"

  const ops = guesses.map(name => operatives.get(name)!).filter(op => !!op)

  function renderExact(guess: string, correct: string) {
    return guess === correct
      ? <span className="text-primary font-bold">{guess} ✔</span>
      : <span>{guess}</span>
  }
  function renderNumSame(guess: string[], correct: string[]) {
    const [same, numSame] = compareArrays(guess.map(getSanitizedWR), correct.map(getSanitizedWR))
    const guessJoin = guess.map(x => x.trim()).filter(x => !!x).join(', ')
    return same
      ? <span className="text-primary font-bold">{guessJoin} ✔</span>
      : <span>{guessJoin} (<span className={numSame > 0 ? "text-amber-500" : ""}>{numSame}</span>)</span>
  }
  function renderHighLow(guess: number, correct: number) {
    if (guess === correct) {
      return <span className="text-primary font-bold">{guess} ✔</span>
    } else if (guess < correct) {
      return <span>{guess} ↑</span>
    } else {
      return <span>{guess} ↓</span>
    }
  }

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return <table>
    <thead>
      <tr className={`divide-x divide-border`}>
        <th className={`${cellStyles}`}>Operative</th>
        <th className={`${cellStyles}`}>Keywords</th>
        {/* <th>Team size</th> not int he data!! */}
        <th className={`${cellStyles}`}>Arche&shy;types</th>
        <th className={`${cellStyles}`}>APL</th>
        <th className={`${cellStyles}`}>Move</th>
        <th className={`${cellStyles}`}>Wounds</th>
        <th className={`${cellStyles}`}>Save</th>
        {/* <th className={`${cellStyles}`}>Base size</th> */}
        <th className={`${cellStyles} cursor-help`}
          title="INCLUDES Faction Abilites due to data limitations">Abilities & Faction Rules</th>
        <th className={`${cellStyles}`}>Weapons</th>
        <th className={`${cellStyles}`}>Weapon damages</th>
        <th className={`${cellStyles}`}>Weapon traits</th>
      </tr>
    </thead>

    <tbody>
      {isClient && ops.map((op) =>
        <tr key={op.opTypeId}
          className={`${cellStyles} text-center divide-x divide-border`}
        >
          <td className={cellStyles}>{renderExact(op.opTypeName, correctOperative.opTypeName)}</td>
          <td className={cellStyles}>{renderNumSame(getKeywords(op), getKeywords(correctOperative))}</td>
          <td className={cellStyles}>{renderNumSame(getArchetypes(op), getArchetypes(correctOperative))}</td>
          <td className={cellStyles}>{renderHighLow(op.APL, correctOperative.APL)}</td>
          <td className={cellStyles}>{renderHighLow(toNumber(op.MOVE), toNumber(correctOperative.MOVE))}</td>
          <td className={cellStyles}>{renderHighLow(op.WOUNDS, correctOperative.WOUNDS)}</td>
          <td className={cellStyles}>{renderHighLow(toNumber(op.SAVE), toNumber(correctOperative.SAVE))}</td>
          <td className={cellStyles}>{renderHighLow(getAbilities(op).length, getAbilities(correctOperative).length)}</td>
          <td className={cellStyles}>{renderHighLow(op.weapons.length, correctOperative.weapons.length)}</td>
          <td className={cellStyles}>{renderNumSame(getWeaponDamages(op), getWeaponDamages(correctOperative))}</td>
          <td className={cellStyles}>{renderNumSame(getWeaponTraits(op), getWeaponTraits(correctOperative))}</td>
        </tr>
      )}
    </tbody>
  </table>
}