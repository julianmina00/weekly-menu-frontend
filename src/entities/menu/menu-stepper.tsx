import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Stepper,
  Step,
  StepButton,
  Typography,
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
  Today as TodayIcon,
} from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@material-ui/lab";

import DateFnsUtils from "@date-io/date-fns";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { IRootState } from "../../shared/reducers";
import { setMeals, updateMeal, removeMeal } from "../meal/meal.reducer";
import { IMeal } from "../../model/meal.model";
import { localDate, weekday } from "../../shared/utils/date-helper";

function getSteps() {
  return ["Añadir comidas", "Ordenar", "Guardar"];
}

interface IButtonAction {
  name: string;
  action(): void;
}

interface IStepAction {
  title: string;
  buttons: IButtonAction[];
  render(): JSX.Element;
}

export interface IMenuProps extends StateProps, DispatchProps {}

const MenuStepper = (props: IMenuProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(new Set<number>());
  const steps = getSteps();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { meals } = props;
  const history = useHistory();

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  function isStepComplete(step: number) {
    return completed.has(step);
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handlerUpdateMeal = (meal: IMeal) => {
    props.updateMeal(meal)
  }

  const handlerRemoveMeal = (id?: string) => {
    if(id){
      props.removeMeal(id);
    }
  }

  const mealTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="a dense table">
          <TableBody>
            {meals.map((meal) => (
              <TableRow key={meal.name}>
                <TableCell>{`${meal.name} (${meal.chef})`}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handlerUpdateMeal(meal)} >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handlerRemoveMeal(meal.id)} >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const createMenu = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Dia inicial"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          {mealTable()}
        </Grid>
      </Grid>
    );
  };

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const mealsArray = [...meals] as IMeal[];
    const [moved] = mealsArray.splice(source.index, 1);
    mealsArray.splice(destination.index, 0, { ...moved });
    props.setMeals(mealsArray as ReadonlyArray<IMeal>);
  };

  const draggableName = (id: number) => "draggable-" + String(id);

  const sortView = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div key="column">
          <div>
            <Droppable droppableId="column" key="column">
              {(droppableProvided) => {
                return (
                  <div
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                  >
                    {meals.map((meal, index) => {
                      return (
                        <Draggable
                          key={draggableName(index)}
                          draggableId={draggableName(index)}
                          index={index}
                        >
                          {(draggableProvided) => {
                            return (
                              <div
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                              >
                                <Paper
                                  elevation={3}
                                  variant="outlined"
                                  square
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    padding: "10px",
                                    margin: "5px 0px",
                                  }}
                                >
                                  <DragIndicatorIcon fontSize="medium" />
                                  <span>
                                    {meal.name} ({meal.chef})
                                  </span>
                                </Paper>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {droppableProvided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    );
  };

  const saveView = () => {
    return (
      <Timeline>
        {meals.map((meal, index) => (
          <TimelineItem key={meal.name}>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{`${weekday(
                meal.date
              )} (${localDate(meal.date)})`}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <TodayIcon />
              </TimelineDot>
              {index < meals.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Typography color="textPrimary">{`${meal.name} (${meal.chef})`}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  };

  const setDates = () => {
    const datedMeals = [...meals] as ReadonlyArray<IMeal>;
    const date = new Date(selectedDate || new Date());
    datedMeals.forEach((meal) => {
      meal.date = new Date(date);
      date.setDate(date.getDate() + 1);
    });
    props.setMeals(datedMeals);
  };

  const handleAddMeal = () => {
    history.push("/meal/new");
  };

  const handleSortNext = () => {
    setDates();
    handleNext();
  };

  const handleSave = () => {
    // Save menu
    const totalMeals = meals.length;
    const menu = {
      startDate: meals[0].date,
      endDate: meals[totalMeals - 1].date,
      meals: [...meals],
    };
    console.log("menu: ");
    console.log(menu);
  };

  const addMealButtonAction = {
    name: "Añadir comida",
    action: handleAddMeal,
  } as IButtonAction;

  const addMealNextButtonAction = {
    name: "Siguiente",
    action: handleNext,
  } as IButtonAction;

  const sortNextButtonAction = {
    name: "Siguiente",
    action: handleSortNext,
  } as IButtonAction;

  const backButtonAction = {
    name: "Atrás",
    action: handleBack,
  } as IButtonAction;

  const saveButtonAction = {
    name: "Guardar",
    action: handleSave,
  } as IButtonAction;

  const addMealStep = {
    title: "Añadir comnidas",
    buttons: [addMealButtonAction, addMealNextButtonAction],
    render: createMenu,
  } as IStepAction;

  const sortStep = {
    title: "Ordenar",
    buttons: [backButtonAction, sortNextButtonAction],
    render: sortView,
  } as IStepAction;

  const saveStep = {
    title: "Guardar",
    buttons: [backButtonAction, saveButtonAction],
    render: saveView,
  } as IStepAction;

  const stepsConfig = [addMealStep, sortStep, saveStep] as IStepAction[];

  const buttonsActionRender = () => {
    const buttons = stepsConfig[activeStep].buttons;
    return (
      <Grid container spacing={3} style={{ padding: "40px" }}>
        {buttons.map((button) => (
          <Grid item xs>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={button.action}
            >
              {button.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

  const stepRender = () => {
    const render = stepsConfig[activeStep].render;
    return render();
  };

  return (
    <div>
      <Grid container spacing={3} style={{ padding: "40px" }}>
        <Grid item xs={12}>
          <Stepper alternativeLabel nonLinear activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={isStepComplete(index)}
                  >
                    {label}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        <Grid item xs={12}>
          {stepRender()}
        </Grid>
      </Grid>
      {buttonsActionRender()}
    </div>
  );
};

const mapStateToProps = ({ meal }: IRootState) => ({
  meals: meal.entities,
});

const mapDispatchToProps = {
  setMeals,
  updateMeal,
  removeMeal
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MenuStepper);
