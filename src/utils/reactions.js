export function getReaction(score) {
  if (score >= 85)
    return { label: "STRONG SHOWING", text: "“Yep. I’d keep reading.”" };
  if (score >= 70)
    return {
      label: "LOOKING GOOD",
      text: "“A little polish goes a long way.”",
    };
  if (score >= 55)
    return {
      label: "GETTING THERE",
      text: "“Give those achievements some airtime.”",
    };
  return { label: "ROOM TO GROW", text: "“There’s a better draft in here.”" };
}
