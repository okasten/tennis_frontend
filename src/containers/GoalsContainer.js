import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Button } from "react-bootstrap";
import NewGoalForm from "../components/NewGoalForm";
import Goal from "../components/Goal";
import GoalInformation from "../components/GoalInformation";
let shortTerm;
let longTerm;

class GoalsContainer extends Component {
  state = {
    newGoal: false,
    showGoal: false
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps !== this.props || !this.state.newGoal || this.state.newGoal) {
      return true;
    } else {
      return false;
    }
  }

  newGoal = () => {
    this.setState({
      newGoal: !this.state.newGoal
    });
  };

  setGoal = goal => {
    this.props.addGoal(this.props.user, goal);
    this.setState({
      newGoal: !this.state.newGoal
    });
  };

  handleClick = goal => {
    this.setState({
      showGoal: true,
      currentGoal: goal
    });
  };

  shortGoals = () => {
    let shortTerm;
    if (this.props.goals) {
      shortTerm = this.props.goals.filter(goal => {
        return goal.kind === "Short-Term";
      });
    } else {
      shortTerm = this.props.user.goals.filter(goal => {
        return goal.kind === "Short-Term";
      });
    }
    return shortTerm;
  };

  longGoals = () => {
    let longTerm;
    if (this.props.goals) {
      longTerm = this.props.goals.filter(goal => {
        return goal.kind === "Long-Term";
      });
    } else {
      longTerm = this.props.user.goals.filter(goal => {
        return goal.kind === "Long-Term";
      });
    }

    return longTerm;
  };

  listShortGoals = () => {
    let goals = this.shortGoals().map(goal => {
      return <Goal key={goal.id} goal={goal} handleClick={this.handleClick} />;
    });
    return goals;
  };

  listLongGoals = () => {
    let goals = this.longGoals().map(goal => {
      return <Goal key={goal.id} goal={goal} handleClick={this.handleClick} />;
    });
    return goals;
  };

  deleteGoal = () => {
    this.setState({
      newGoal: false,
      showGoal: false
    });
  };
  render() {
    return (
      <React.Fragment>
        <h1> Short-Term #GOALS </h1>
        {this.listShortGoals()}
        <h1> Long-Term #GOALS</h1>
        {this.listLongGoals()}
        <Button onClick={this.newGoal}>Create A New Goal</Button>
        {this.state.newGoal ? (
          <NewGoalForm handleClick={this.handleClick} setGoal={this.setGoal} />
        ) : null}
        {this.state.showGoal ? (
          <GoalInformation
            goal={this.state.currentGoal}
            handleShow={this.deleteGoal}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    goals: state.goals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGoal: (user, goal) => dispatch(actions.addGoal(user, goal))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalsContainer);
