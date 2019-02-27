import Background from './images/backgrounds/JainaProudmoore.jpg';
import Headshot from './images/headshots/JainaProudmoore.png';

export default {
  id: 2281,
  name: 'Jaina Proudmoore', // Horde
  background: Background,
  headshot: Headshot,
  icon: 'achievement_boss_zuldazar_jaina',
  fight: {
    vantusRuneBuffId: 285543,
    softMitigationChecks: {
      physical: [],
      magical: [
        287565, // Avalanche
      ],
    },
  },
};
