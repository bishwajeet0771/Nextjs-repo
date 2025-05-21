function sqftToAcres(sqft: number): number {
  const acres: number = sqft / 43560.0; // 1 acre = 43560 square feet
  return acres;
}
export { sqftToAcres };
