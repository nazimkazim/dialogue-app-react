import React, { Component } from "react";
import styled from "styled-components";
import Banner from "./components/Banner";
import AimsComponent from "./components/AimsComponent";
import BubbleSpeech from "./components/BubbleSpeech";
import TickWords from "./components/TickWords";
import { Grid, Modal, Button } from "semantic-ui-react";
import Instruction from "../Instructions";
import ReactHtmlParser from "react-html-parser";
import SideNotes from "./components/SideNotes";

import data from "./lessonsData/lesson1";
import MatchImageToWord from "../MatchImageToWord";

const margins = {
  small: "10px",
  medium: "20px",
  large: "80px"
};

const color = {
  blue: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)"
};

const Section = styled.div`
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
    console.log(data.matchProfessions);
    return (
      <>
        <Banner number="06" name="JOBS & WORK" color={color.blue} />
        <Section>
          <Grid>
            <Grid.Row>
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
                <div style={{ marginTop: margins.small }}>
                  <BoldedNumber>1</BoldedNumber>
                  <Instruction
                    engInstruction="Tick (&#10004;) the things you think are important in job."
                    rusInstruction="Отметьте (&#10004;) вещи которые по вашему мнению важны для работы"
                  />
                </div>
                <TickWords list={data.importantThingsList} />

                <div style={{ marginTop: margins.small }}>
                  <BoldedNumber>2</BoldedNumber>
                  <Instruction
                    engInstruction={ReactHtmlParser(
                      "<strong>I pairs</strong>. Tell your partner what you think is important"
                    )}
                    rusInstruction={ReactHtmlParser(
                      "<strong>В паре</strong>. Скажите партнеру что для вас важно и что вы любите или не  любите"
                    )}
                    bolded="true"
                  />
                </div>

                <p>
                  <em>Example:</em> I think a good salary is important, and I
                  like work in a team
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Section>
        <Section>
          <Grid>
            <Grid.Row>
              <Grid.Column width={6}>
                <div style={{ marginTop: margins.large }}>
                  <SideNotes
                    notes={[
                      ReactHtmlParser(
                        "<strong><em>a</em> + consonant</strong>"
                      ),
                      ReactHtmlParser(
                        "<em>I'm <strong>a</strong> student</em>"
                      ),
                      ReactHtmlParser("<em>an</em> + vowel"),
                      ReactHtmlParser(
                        "<em>I'm</em> <strong>an</strong> architect"
                      )
                    ]}
                  />
                </div>
              </Grid.Column>
              <Grid.Column width={10}>
                <HeaderH2 style={{ marginTop: margins.medium }}>
                  Vocabulary
                </HeaderH2>
                <h2>Occupations</h2>
                <div style={{ marginTop: margins.small }}>
                  <BoldedNumber>1</BoldedNumber>
                  <Instruction
                    engInstruction="Can you answer this question in two ways?"
                    rusInstruction="Можете ответить на этот вопрос двумя способами?"
                  />
                </div>
                <Grid verticalAlign="middle" columns={3}>
                  <Grid.Column>
                    <BubbleSpeech
                      left="3px"
                      width="240px"
                      height="125px"
                      borderColor="pink"
                      background="#CDDC39"
                      borderRadius="43px"
                      position="relative"
                      content="What do you do?"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <BubbleSpeech
                      left="3px"
                      width="240px"
                      height="125px"
                      borderColor="pink"
                      borderRadius="43px"
                      background="#F8BBD0"
                      position="relative"
                      content={[
                        "I'm a student",
                        "I go to the university of Prague"
                      ]}
                    />
                    <br />
                    <BubbleSpeech
                      left="3px"
                      width="240px"
                      height="125px"
                      borderColor="pink"
                      borderRadius="43px"
                      background="#00BCD4"
                      position="relative"
                      content={["I'm a bank clerk", "I work for a German bank"]}
                    />
                  </Grid.Column>
                </Grid>
                <div style={{ marginTop: margins.small }}>
                  <BoldedNumber>2</BoldedNumber>
                  <Instruction
                    engInstruction={ReactHtmlParser(
                      "<strong>Against the clock</strong>. <em>2 minutes</em> Match these jobs to the pictures"
                    )}
                    rusInstruction={ReactHtmlParser(
                      "<strong>На время</strong>. <em>2 минуты</em> Соотнесите эти профессии с рисунками"
                    )}
                    bolded="true"
                  />
                </div>
                <Modal trigger={<Button>Start exercise</Button>}>
                  <Modal.Header>
                    Match photos to words
                    <br></br>
                    <Instruction
                      engInstruction="To play pronunciation click on a word"
                      rusInstruction="Чтобы прослушать произношение нажмите на слово."
                      label={true}
                    />
                  </Modal.Header>
                  <Modal.Content>
                    <MatchImageToWord lines={data.matchProfessions} />
                  </Modal.Content>
                </Modal>
                <div style={{ marginTop: margins.medium }}>
                  <BoldedNumber>3</BoldedNumber>
                  <Instruction
                    engInstruction="Now match six of the jobs with these sentences."
                    rusInstruction="Теперь соотнесите 6 профессий с этими предложениями."
                  />
                </div>
                <Modal trigger={<Button>Start exercise</Button>}>
                  <Modal.Header>Match photos to words</Modal.Header>
                  <Modal.Content>
                    <MatchImageToWord lines={data.sentencesToJobs} />
                  </Modal.Content>
                </Modal>
                <div style={{ marginTop: margins.medium }}>
                  <BoldedNumber>4</BoldedNumber>
                  <Instruction
                    engInstruction="Write your own sentences for the other four jobs."
                    rusInstruction="Напишите свои собственные предложения для других четырех профессий."
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Section>
      </>
    );
  }
}

export default LessonPage;
