const matchingService = require("../services/matchingService");
const userBuyBoxService = require("../services/userBuyBoxService");
const dealService = require("../services/dealService");

const getMatchedDeals = async (req, res) => {
  try {
    const userId = req.user.uid;

    // Get user's Buy Box
    const buyBox = await userBuyBoxService.findByUserId(userId);

    if (!buyBox) {
      return res.status(400).json({
        error: "User has not set up Buy Box yet",
        matches: [],
        message: "Please set up your investment preferences first",
      });
    }

    // Get all deals
    const allDeals = await dealService.getAllDeals();

    // Calculate scores for each deal
    const scoredDeals = allDeals.map((deal) => {
      const score = matchingService.calculateMatchScore(deal, buyBox);
      const reasons = matchingService.getMatchReasons(deal, buyBox);

      return {
        ...deal,
        matchScore: score,
        matchReasons: reasons,
        isMatched: score >= 50,
      };
    });

    // Filter only matched deals and sort by score descending
    const matchedDeals = scoredDeals
      .filter((d) => d.isMatched)
      .sort((a, b) => b.matchScore - a.matchScore);

    // Calculate statistics
    const statistics = {
      totalMatched: matchedDeals.length,
      totalDealsChecked: allDeals.length,
      averageScore:
        matchedDeals.length > 0
          ? Math.round(
              matchedDeals.reduce((sum, d) => sum + d.matchScore, 0) /
                matchedDeals.length
            )
          : 0,
    };

    return res.status(200).json({
      buyBox,
      matches: matchedDeals,
      count: matchedDeals.length,
      statistics,
    });
  } catch (error) {
    console.error("Get matched deals error:", error);
    return res.status(500).json({ error: "Failed to fetch matched deals" });
  }
};

const getMatchScore = async (req, res) => {
  try {
    const userId = req.user.uid;
    const dealId = req.params.dealId;

    // Get user's Buy Box
    const buyBox = await userBuyBoxService.findByUserId(userId);

    if (!buyBox) {
      return res.status(400).json({
        error: "User has not set up Buy Box yet",
        message: "Please set up your investment preferences first",
      });
    }

    // Get specific deal
    const deal = await dealService.getDealById(dealId);

    if (!deal) {
      return res.status(404).json({ error: "Deal not found" });
    }

    // Calculate score and reasons
    const score = matchingService.calculateMatchScore(deal, buyBox);
    const reasons = matchingService.getMatchReasons(deal, buyBox);

    return res.status(200).json({
      deal,
      matchScore: score,
      matchReasons: reasons,
      isMatched: score >= 50,
    });
  } catch (error) {
    console.error("Get match score error:", error);
    return res.status(500).json({ error: "Failed to calculate match score" });
  }
};

module.exports = { getMatchedDeals, getMatchScore };
