import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { styled } from 'styletron-react';

import BaseComponent from './BaseComponent.js';

const Container = styled('div', {
  width: '805px',
  margin: '50px auto 0'
});

const Header = styled('header', { });

const Heading = styled('h1', { });

const DaysOfWeek = styled('div', { });

const Days = styled('div', { });

export default class Calendar extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: moment("11-1-2016", "MM-DD-YYYY").startOf("month"),
    };
  }

  getWeeks() {
    const { selectedMonth } = this.state;
    const beginningOfCalendar = selectedMonth.clone().startOf('week');
    const weekCursor = beginningOfCalendar.clone();
    const weeks = [];

    _.times(6, () => {
      const dayCursor = weekCursor.clone();
      const days = [];

      _.times(7, () => {
        days.push({
          momentObject: dayCursor.clone(),
        });

        dayCursor.add(1, 'day');
      });

      weeks.push(days);
      weekCursor.add(1, 'week');
    });

    return weeks;
  }

  render() {
    const { selectedMonth } = this.state;
    const weeks = this.getWeeks();

    console.log(selectedMonth);
    console.log(weeks);

    return (
      <Container>
        <Header>
          <Heading>
            HEADING
          </Heading>

          <DaysOfWeek>
            DAYS OF WEEK
          </DaysOfWeek>
        </Header>

        <Days>
          DAYS
        </Days>
      </Container>
    );
  }
}
