import React from 'react';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
// import SPELLS from 'common/SPELLS';
import CoreAlwaysBeCasting from 'parser/shared/modules/AlwaysBeCasting';
import { formatPercentage } from 'common/format';
import { STATISTIC_ORDER } from 'interface/others/StatisticBox';
// import SpellLink from 'common/SpellLink';

class AlwaysBeCasting extends CoreAlwaysBeCasting {
  get suggestionThresholds() {
    return {
      actual: this.downtimePercentage,
      isGreaterThan: {
        minor: 0.25,
        average: 0.30,
        major: 0.35,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }
// TODO: Change the following to be Ass Rogue specific.
// If a fight requires movement, try saving <SpellLink id={SPELLS.PRESENCE_OF_MIND.id} /> to make your next 2 <SpellLink id={SPELLS.ARCANE_BLAST.id} /> casts instant.

  suggestions(when: When) {
    const deadTimePercentage = this.totalTimeWasted / this.owner.fightDuration;
    const boss = this.owner.boss;

    if(!boss || !boss.fight.disableDeathSuggestion) {
      when(deadTimePercentage).isGreaterThan(this.suggestionThresholds.isGreaterThan.minor)
        .addSuggestion((suggest, actual, recommended) => suggest(<span>Your downtime can be improved. Try to Always Be Casting (ABC), try to reduce the delay between casting spells.</span>)
          .icon('spell_mage_altertime')
          .actual(`${formatPercentage(actual)}% downtime`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`)
          .regular(recommended + 0.05).major(recommended + 0.1));
    }
  }
}

export default AlwaysBeCasting;
