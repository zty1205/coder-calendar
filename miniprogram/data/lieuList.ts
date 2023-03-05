const lieuList: TimeItem[] = [
  { y: '2023', m: '1', d: '28', cd: '六', s: '2', t: '', hd: '' },
  { y: '2023', m: '1', d: '29', cd: '日', s: '2', t: '', hd: '' },
  { y: '2023', m: '4', d: '23', cd: '日', s: '2', t: '', hd: '' },
  { y: '2023', m: '5', d: '6', cd: '六', s: '2', t: '立夏', hd: '' },
  { y: '2023', m: '6', d: '25', cd: '日', s: '2', t: '', hd: '' },
  { y: '2023', m: '10', d: '7', cd: '六', s: '2', t: '', hd: '' },
  { y: '2023', m: '10', d: '8', cd: '日', s: '2', t: '寒露', hd: '' }
];

const lieuMap = new Map<string, TimeItem>()

export function getLieuMap(): Map<string, TimeItem> {
  if (lieuMap.size > 0) return lieuMap
  return lieuList.reduce((map, h) => {
    map.set(`${h.m}/${h.d}`, h);
    return map;
  }, lieuMap);
}


export default lieuList;
