const lieuList: TimeItem[] = [
  { y: '2024', m: '2', d: '4', cd: '日', s: '2', t: '立春', hd: '' },
  { y: '2024', m: '2', d: '18', cd: '日', s: '2', t: '', hd: '' },
  { y: '2024', m: '4', d: '7', cd: '日', s: '2', t: '', hd: '' },
  { y: '2024', m: '4', d: '28', cd: '日', s: '2', t: '', hd: '' },
  { y: '2024', m: '5', d: '11', cd: '六', s: '2', t: '', hd: '' },
  { y: '2024', m: '9', d: '14', cd: '六', s: '2', t: '', hd: '' },
  { y: '2024', m: '9', d: '29', cd: '日', s: '2', t: '', hd: '' },
  { y: '2024', m: '10', d: '12', cd: '六', s: '2', t: '', hd: '' }
];

const lieuMap = new Map<string, TimeItem>();

export function getLieuMap(): Map<string, TimeItem> {
  if (lieuMap.size > 0) return lieuMap;
  return lieuList.reduce((map, h) => {
    map.set(`${h.m}/${h.d}`, h);
    return map;
  }, lieuMap);
}

export default lieuList;
