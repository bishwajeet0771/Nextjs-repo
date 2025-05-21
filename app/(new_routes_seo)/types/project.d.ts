type PhaseOverview = {
    phaseId: number;
    phaseName: string | null;
    launchDate: string;
    possassionDate: string;
    landArea: number;
    rerastatus: string | null;
    reraId: string | null;
    phaseBrochureUrl: string | null;
    phasePromoter: string | null;
    expectedCompletion: string | null;
    sequence: number | null;
    propTypeOverview: {
      apt?: {
        elevation: number;
        unitTypes: string[];
        landarea: string;
        unitCount: number;
        minPrice: number;
        maxPrice: number;
        basePrice: string;
        priceList: Array<{
          bhkOrDimension: string;
          minCa: number;
          maxCa: number;
          minSba: number;
          maxSba: number;
          minPrice: string;
          maxPrice: string;
        }>;
      };
      plot?: {
        landarea: string;
        unitCount: number;
        basePrice: string;
      };
    };
  };
  
  // eslint-disable-next-line no-unused-vars
  type ProjectData = {
    phaseOverview: PhaseOverview[];
  };
  