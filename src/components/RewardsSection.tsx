import React, { useState, useEffect } from 'react';

interface Reward {
  name: string;
  cost: number;
  perk: {
    type: string;
    value: number;
  };
  description: string;
  claimed?: boolean;
}

interface RewardsSectionProps {
  coins: number;
  onCoinChange?: (newCoins: number) => void;
  onRewardClaimed?: (reward: Reward) => void;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ 
  coins = 0, 
  onCoinChange,
  onRewardClaimed 
}) => {
  const [unlockedRewards, setUnlockedRewards] = useState<Reward[]>([]);
  
  // Define available rewards
  const COIN_REWARDS: Reward[] = [
    { name: "🥉 Bronze Tier", cost: 300, perk: { type: 'coins', value: 100 }, description: "Claim +100 Bonus Coins" },
    { name: "🥈 Silver Tier", cost: 600, perk: { type: 'freeze', value: 1 }, description: "Claim a Free Streak Freeze" },
    { name: "🥇 Gold Tier", cost: 1000, perk: { type: 'boost', value: 24 }, description: "Claim a Free 24h Coin Boost" },
    { name: "💎 Diamond Tier", cost: 2000, perk: { type: 'video', value: 1 }, description: "Claim a Free Bonus Video Unlock" }
  ];

  // Load unlocked rewards from localStorage on component mount
  useEffect(() => {
    const savedRewards = localStorage.getItem("unlockedRewards");
    if (savedRewards) {
      setUnlockedRewards(JSON.parse(savedRewards));
    }
  }, []);

  // Save unlocked rewards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("unlockedRewards", JSON.stringify(unlockedRewards));
  }, [unlockedRewards]);

  // Check for newly unlocked rewards based on coin count
  useEffect(() => {
    COIN_REWARDS.forEach(reward => {
      // Check if reward is already in unlockedRewards
      const existingReward = unlockedRewards.find(r => r.name === reward.name);
      
      // If user has enough coins and reward is not already unlocked, add it
      if (coins >= reward.cost && !existingReward) {
        const newReward = { ...reward, claimed: false };
        setUnlockedRewards(prev => [...prev, newReward]);
        
        // Show notification (in a real app, this would be a toast or popup)
        console.log(`Reward Tier Unlocked: ${reward.name}!`);
      }
    });
  }, [coins, unlockedRewards]);

  // Handle claiming a reward
  const claimRewardPerk = (rewardName: string) => {
    const reward = COIN_REWARDS.find(r => r.name === rewardName);
    const rewardIndex = unlockedRewards.findIndex(r => r.name === rewardName);
    
    if (!reward || rewardIndex === -1 || unlockedRewards[rewardIndex].claimed) {
      return;
    }

    // Mark reward as claimed
    const updatedRewards = [...unlockedRewards];
    updatedRewards[rewardIndex] = { ...updatedRewards[rewardIndex], claimed: true };
    setUnlockedRewards(updatedRewards);

    // Apply reward effect
    if (onRewardClaimed) {
      onRewardClaimed(reward);
    }

    // Show notification (in a real app, this would be a toast or popup)
    console.log(`Perk Claimed! ${reward.description}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🎁 Rewards</h3>
      
      <div className="space-y-3">
        {COIN_REWARDS.map((reward, index) => {
          const existingReward = unlockedRewards.find(r => r.name === reward.name);
          const isUnlocked = !!existingReward;
          const isClaimed = existingReward?.claimed;
          
          return (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${
                isUnlocked 
                  ? "bg-yellow-50 border-yellow-200" 
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-medium ${isUnlocked ? "text-yellow-900" : "text-gray-700"}`}>
                    {reward.name}
                  </p>
                  <p className={`text-sm ${isUnlocked ? "text-yellow-700" : "text-gray-600"}`}>
                    {reward.description}
                  </p>
                  {!isUnlocked && (
                    <p className="text-xs text-gray-500 mt-1">
                      Requires {reward.cost} coins
                    </p>
                  )}
                </div>
                
                {isUnlocked && !isClaimed && (
                  <button
                    onClick={() => claimRewardPerk(reward.name)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600 transition-colors"
                  >
                    Claim
                  </button>
                )}
                
                {isClaimed && (
                  <span className="text-green-600 font-medium text-sm">
                    ✅ Claimed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardsSection;