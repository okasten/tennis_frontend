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
    showGoal: false,
    currentGoal: ""
  };

  componentDidMount() {
    this.props.loadGoals(this.props.user);
    this.props.getGoal(this.state.currentGoal);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps !== this.props ||
      !this.state.newGoal ||
      this.state.newGoal ||
      this.state.showGoal
    ) {
      return true;
    } else {
      return false;
    }
  }

  newGoal = () => {
    this.setState({
      newGoal: !this.state.newGoal,
      showGoal: false
    });
  };

  setGoal = goal => {
    this.props.addGoal(this.props.user, goal);
    this.setState({
      newGoal: !this.state.newGoal
    });
    this.props.getGoal(goal);
    this.handleClick(goal);
  };

  handleClick = goal => {
    this.setState({
      showGoal: true,
      currentGoal: goal
    });

    this.props.getGoal(goal);
  };

  shortGoals = () => {
    let shortTerm;
    if (this.props.goals) {
      shortTerm = this.props.goals.filter(goal => {
        return goal.kind === "Short-Term" && !goal.met;
      });
    } else {
      shortTerm = this.props.user.goals.filter(goal => {
        return goal.kind === "Short-Term" && !goal.met;
      });
    }
    return shortTerm;
  };

  longGoals = () => {
    let longTerm;
    if (this.props.goals) {
      longTerm = this.props.goals.filter(goal => {
        return goal.kind === "Long-Term" && !goal.met;
      });
    } else {
      longTerm = this.props.user.goals.filter(goal => {
        return goal.kind === "Long-Term" && !goal.met;
      });
    }

    return longTerm;
  };

  listShortGoals = () => {
    let goals = this.shortGoals().map(goal => {
      return (
        <Goal
          key={goal.id}
          goal={goal}
          handleClick={() => this.handleClick(goal)}
        />
      );
    });
    return goals;
  };

  listLongGoals = () => {
    let goals = this.longGoals().map(goal => {
      return (
        <Goal
          key={goal.id}
          goal={goal}
          handleClick={goal => this.handleClick(goal)}
        />
      );
    });
    return goals;
  };

  metGoals = () => {
    let metGoals;
    if (this.props.goals) {
      metGoals = this.props.goals.filter(goal => {
        return goal.met;
      });
    } else {
      metGoals = this.props.user.goals.filter(goal => {
        return goal.met;
      });
    }
    return metGoals;
  };

  listMetGoals = () => {
    let goals = this.metGoals().map(goal => {
      return (
        <Goal
          key={goal.id}
          goal={goal}
          handleClick={goal => this.handleClick(goal)}
        />
      );
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
      <div>
        <div className="goalsContainer">
          <h1 className="goalsHeader">My #GOALS</h1>
          <div className="goals">
            <h1 className="goalHeader"> Short-Term #GOALS </h1>
            <div className="indiGoals">{this.listShortGoals()}</div>
          </div>
          <div className="goals">
            <h1 className="goalHeader"> Long-Term #GOALS</h1>
            <div className="indiGoals">{this.listLongGoals()}</div>
          </div>
          <div className="goals">
            <h1 className="goalHeader">Crushed #GOALS</h1>
            <div className="indiGoals">{this.listMetGoals()}</div>
          </div>
          <Button className="goalsButton" onClick={this.newGoal}>
            Create A New Goal
          </Button>
        </div>
        {this.state.newGoal ? (
          <div className="newGoalForm">
            {" "}
            <NewGoalForm
              setGoal={this.setGoal}
              closeForm={this.deleteGoal}
            />{" "}
          </div>
        ) : null}
        {this.state.showGoal ? (
          <div className="goalInfo">
            <GoalInformation
              goal={this.props.theGoal}
              handleShow={this.deleteGoal}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    goals: state.goals,
    theGoal: state.goal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addGoal: (user, goal) => dispatch(actions.addGoal(user, goal)),
    loadGoals: user => dispatch(actions.loadGoals(user)),
    getGoal: goal => dispatch(actions.gettingGoal(goal))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalsContainer);
