import React, { Component } from "react";
import styled from "styled-components";
import Banner from "./components/Banner";
import AimsComponent from "./components/AimsComponent";
import BubbleSpeech from "./components/BubbleSpeech";
import TickWords from "./components/TickWords";
import { Grid } from "semantic-ui-react";

import data from "./lessonsData/lesson1";

const margins = {
  small: "10px"
};

const color = {
  blue: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)"
};

const SpeakingSection = styled.div`
  min-height: 500px;
  width: 100%;
`;

const HeaderH2 = styled.h1`
  margin-top: 10px;
`;

const BoldedNumber = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

class LessonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <Banner number="06" name="JOBS & WORK" color={color.blue} />
        <SpeakingSection>
          <Grid>
            <Grid.Column width={6}>
              <AimsComponent aims={data.inThisLesson} />
              <BubbleSpeech
                left="30px"
                width="240px"
                height="125px"
                borderColor="pink"
                borderRadius="43px"
                position="relative"
                content="What does ______ mean?"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <HeaderH2>Speak for yourself</HeaderH2>
              <p style={{ marginTop: margins.small }}>
                <BoldedNumber>1</BoldedNumber>
                Tick (&#10004;) the things you think are important in job.
              </p>
              <TickWords list={data.importantThingsList} />

              <p style={{ marginTop: margins.small }}>
                <BoldedNumber>2</BoldedNumber>
                <strong>In pairs.</strong> Tell your partner what you think is
                important and what you like.
              </p>

              <p>
                <em>Example:</em> I think a good salary is important, and I like
                work in a team
              </p>
            </Grid.Column>
          </Grid>
        </SpeakingSection>
      </>
    );
  }
}

export default LessonPage;
