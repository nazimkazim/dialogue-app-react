import React, { Component } from "react";
import styled from "styled-components";
import Banner from "./components/Banner";
import AimsComponent from "./components/AimsComponent";
import { Grid } from "semantic-ui-react";

import data from "./lessonsData/lesson1";

const color = {
  blue: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)"
};

const SpeakingSection = styled.div`
  min-height: 500px;
  width: 100%;
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
            </Grid.Column>
            <Grid.Column width={10}>Right column</Grid.Column>
          </Grid>
        </SpeakingSection>
      </>
    );
  }
}

export default LessonPage;
