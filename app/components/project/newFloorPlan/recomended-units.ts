/* eslint-disable no-unused-vars */
import { PropertyUnit } from "./types/floor-plan";

interface PropertyScore {
  unit: PropertyUnit;
  score: number;
}

export class PropertyRecommender {
  private readonly WEIGHTS = {
    bhkMatch: 5, // Same number of bedrooms
    towerMatch: 3, // Same tower
    floorMatch: 2, // Similar floor level
    areaMatch: 4, // Similar carpet area
    facingMatch: 2, // Same facing direction
    bathroomMatch: 3, // Similar number of bathrooms
    balconyMatch: 2, // Similar number of balconies
    parkingMatch: 1, // Similar parking arrangement
  };

  constructor(private allUnits: PropertyUnit[]) {}

  getSimilarUnits(
    referenceUnit: PropertyUnit,
    count: number = 8
  ): PropertyUnit[] {
    // Don't include the reference unit in recommendations
    const otherUnits = this.allUnits.filter(
      (unit) => unit.unitIdEnc !== referenceUnit.unitIdEnc
    );

    const scores: PropertyScore[] = otherUnits.map((unit) => ({
      unit,
      score: this.calculateSimilarityScore(referenceUnit, unit),
    }));

    // Sort by score descending and return the top units
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, count)
      .map((score) => score.unit);
  }

  private calculateSimilarityScore(
    reference: PropertyUnit,
    candidate: PropertyUnit
  ): number {
    let score = 0;

    // BHK (bedroom) match
    if (reference.bhkName === candidate.bhkName) {
      score += this.WEIGHTS.bhkMatch;
    }

    // Tower match
    if (reference.towerName === candidate.towerName) {
      score += this.WEIGHTS.towerMatch;
    }

    // Floor proximity (within 2 floors)
    const floorDiff = Math.abs(
      (reference.floor as number) - (candidate.floor as number)
    );
    if (floorDiff <= 2) {
      score += this.WEIGHTS.floorMatch * (1 - floorDiff * 0.3);
    }

    // Carpet area similarity (within 15% range)
    const refArea = parseFloat(reference.caretarea);
    const candArea = parseFloat(candidate.caretarea);
    const areaDiffPercentage = Math.abs(refArea - candArea) / refArea;
    if (areaDiffPercentage <= 0.15) {
      score += this.WEIGHTS.areaMatch * (1 - areaDiffPercentage);
    }

    // Facing direction match
    if (reference.facingName === candidate.facingName) {
      score += this.WEIGHTS.facingMatch;
    }

    // Bathroom count similarity
    if (reference.totalNumberofBathroom === candidate.totalNumberofBathroom) {
      score += this.WEIGHTS.bathroomMatch;
    }

    // Balcony count similarity
    if (reference.totalNumberOfBalcony === candidate.totalNumberOfBalcony) {
      score += this.WEIGHTS.balconyMatch;
    }

    // Parking similarity
    if (
      reference.parkingType === candidate.parkingType &&
      reference.noOfCarParking === candidate.noOfCarParking
    ) {
      score += this.WEIGHTS.parkingMatch;
    }

    return score;
  }
}
