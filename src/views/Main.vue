<template>
  <div class="container px-7 h-screen" id="container">
    <div v-if="pageLoaded">
      <div class="mt-3 d-flex justify-between px-10">
        <div
          class="d-flex flex-column justify-end pb-1"
          @click="previousMonth()"
        >
          <v-icon
            color="primary"
            class="border-stone-300 border-2 w-fit text-center rounded-full"
            >mdi-chevron-right</v-icon
          >
        </div>

        <div class="text-center">
          <p class="primary--text text--lighten-1 text-md mb-2">{{ year }}</p>
          <p class="primary--text text-2xl mb-0">{{ computedMonth }}</p>
        </div>

        <div class="d-flex flex-column justify-end pb-1" @click="nextMonth()">
          <v-icon
            color="primary"
            class="border-stone-300 border-2 w-fit text-center rounded-full"
            >mdi-chevron-left</v-icon
          >
        </div>
      </div>

      <div>
        <div class="mt-9 d-flex">
          <div
            v-for="(day, index) in weekDays"
            :key="index"
            class="weekday-box text-center primary--text rounded-full"
            :style="'margin: 0 ' + computedSpace + 'px'"
          >
            {{ day }}
          </div>
        </div>
        <div class="d-flex flex-wrap mt-4">
          <div
            v-for="(number, index) in numberOfDay"
            :key="index"
            class="day-box text-center rounded-full"
            :style="
              index == 0
                ? computedFirstSpace
                : 'margin: 0 ' + computedSpace + 'px'
            "
          >
            <div
              class="mx-auto rounded-full hover:cursor-pointer d-flex justify-center"
              @click="selectDate(number)"
              :class="{
                'primary white--text':
                  year == currentYear &&
                  month == currentMonth &&
                  number == Number(currentDay),
                'outline-box':
                  year == selected.year &&
                  month == selected.month &&
                  number == selected.day,
              }"
            >
              {{ number }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="tasks-box shadow py-2 px-8 absolute bottom-0 left-0 w-full"
        :class="{ 'open-box': openBox, 'close-box': addingTaskDialog }"
      >
        <div>
          <div class="text-center mb-1">
            <span @click="openBox = !openBox">
              <v-icon v-if="!openBox" color="primary" large
                >mdi-chevron-up</v-icon
              >
              <v-icon v-else color="primary" large>mdi-chevron-down</v-icon>
            </span>
            <div
              class="text-xl primary--text font-bold mb-0 mt-2 grey--text text--darken-2 pt-2"
            >
              <v-icon style="transform: scaleX(-1)" large color="primary"
                >mdi-vanish-quarter</v-icon
              >

              {{
                `${Number(selected.day)} ${
                  monthsName[Number(selected.month) - 1]
                } ${selected.year}`
              }}
              <v-icon large color="primary">mdi-vanish-quarter</v-icon>
            </div>
          </div>
          <div v-if="dayTasks.length">
            <p class="primary--text text-xl my-6">
              تسک‌های من <span class="text-sm">({{ dayTasks.length }})</span>
            </p>
            <div
              v-for="(item, index) in dayTasks"
              :key="index"
              class="d-flex justify-space-between"
            >
              <div class="d-flex mb-4">
                <span
                  class="d-flex flex-column justify-content-start"
                  @click="toggleCheckbox(item)"
                >
                  <v-icon color="primary" class="me-2" v-if="!item.done"
                    >mdi-checkbox-blank-outline</v-icon
                  >
                  <v-icon color="primary" class="me-2" v-else
                    >mdi-checkbox-marked-outline</v-icon
                  >
                </span>
                <span
                  :class="
                    item.done
                      ? 'text-decoration-line-through grey--text text--darken-1'
                      : ''
                  "
                  >{{ item.title }}</span
                >
              </div>
              <div>
                <v-icon small>mdi-close</v-icon>
              </div>
            </div>

            <div class="add-button" @click="addingTaskDialog = true">
              <v-btn color="primary" height="50" rounded small
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </div>
          </div>
          <div v-else class="no-task text-center text-md primary--text">
            <p class="mb-3">تاکنون تسکی افزوده نشده است!</p>
            <v-btn
              height="42"
              outlined
              class="rounded-xl"
              color="primary"
              @click="addingTaskDialog = true"
              ><v-icon class="me-1">mdi-plus</v-icon>
              <b class="text-xs"> افزودن تسک جدید </b></v-btn
            >
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog for adding a task -->
    <v-dialog v-model="addingTaskDialog" width="400">
      <v-card class="pt-4 rounded-xl">
        <v-card-text>
          <div class="text-right">
            <p class="text-2xl primary--text mb-1">تسک جدید</p>
            <p class="grey--text mb-6">
              <v-icon color="grey" class="me-1">$Calendar</v-icon
              >{{ informalSelectedDate }}
            </p>
            <v-text-field
              label="* عنوان"
              filled
              rounded
              hide-details
              v-model="newTask.title"
            ></v-text-field>
            <v-card
              class="color-pallet-container d-flex justify-space-around mt-4 secondary lighten-1"
            >
              <div
                v-for="(color, index) in colorPallet"
                :key="index"
                @click="selectColor(color)"
                class="cursor-pointer"
              >
                <div class="color-pallet" :style="'background-color:' + color">
                  <v-icon color="white" v-if="newTask.color == color"
                    >mdi-check</v-icon
                  >
                </div>
                <br />
              </div>
            </v-card>
            <div class="mt-10 d-flex justify-space-between">
              <v-btn
                color="primary"
                class="rounded-xl"
                outlined
                width="100"
                :disabled="!newTask.title"
                @click="createNewTask"
                ><v-icon class="me-1">mdi-check</v-icon>افزودن</v-btn
              >
              <v-btn
                @click="addingTaskDialog = false"
                color="error"
                class="ms-2 rounded-xl"
                outlined
                width="100"
                ><v-icon class="me-1">mdi-close</v-icon>بستن</v-btn
              >
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment-jalaali";
import { v4 as uuidv4 } from "uuid"; // id generator package
export default {
  name: "CalendarMain",

  data() {
    return {
      moment: moment,
      currentYear: moment(new Date()).format("jYYYY"),
      currentMonth: moment(new Date()).format("jMM"),
      currentDay: moment(new Date()).format("jDD"),
      year: moment(new Date()).format("jYYYY"),
      month: moment(new Date()).format("jMM"),
      day: moment(new Date()).format("jDD"),
      numberOfDay: null,
      numberOfWeekDay: null,
      selected: {
        year: "",
        month: "",
        day: "",
      },
      weekDays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
      colorPallet: ["#1DE9B6", "#FFC107", "#FF3B3B"],
      monthsName: [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],
      daysOfWeek: [
        {
          text: "یکشنبه",
          value: 1,
        },
        {
          text: "دوشنبه",
          value: 2,
        },
        {
          text: "سه‌شنبه",
          value: 3,
        },
        {
          text: "چهارشنبه",
          value: 4,
        },
        {
          text: "پنجشنبه",
          value: 5,
        },
        {
          text: "جمعه",
          value: 6,
        },
        {
          text: "شنبه",
          value: 0,
        },
      ],
      addingTaskDialog: false,
      pageLoaded: false,
      openBox: false,
      reactivity: false,
      allTasks: [],
      dayTasks: [],
      newTask: {
        title: "",
        color: "",
      },
    };
  },

  mounted() {
    this.getNumberOfDays();
    this.selectToday();
    setTimeout(() => {
      this.pageLoaded = true;
    }, 100);
    this.allTasks = localStorage.getItem("allTasks")
      ? JSON.parse(localStorage.getItem("allTasks"))
      : [];
    this.selectedDayTasks();
    // localStorage.clear();
  },

  methods: {
    selectedDayTasks() {
      let index = this.allTasks.findIndex(
        (x) => x.date == this.formalSelectedDate
      );
      if (index > -1) {
        this.dayTasks = this.allTasks[index].tasks;
      } else this.dayTasks = [];
    },
    selectToday() {
      this.selected.year = this.currentYear;
      this.selected.month = this.currentMonth;
      this.selected.day = this.currentDay;
    },
    previousMonth() {
      if (Number(this.month) != 1) {
        this.month--;
      } else {
        this.month = 12;
        this.year--;
      }
      this.getNumberOfDays();
    },
    nextMonth() {
      if (Number(this.month) != 12) {
        this.month++;
      } else {
        this.month = 1;
        this.year++;
      }
      this.getNumberOfDays();
    },
    getNumberOfDays() {
      if (1 <= parseInt(this.month) && parseInt(this.month) < 7) {
        this.numberOfDay = 31;
      }
      if (7 <= parseInt(this.month) && parseInt(this.month) != 12) {
        this.numberOfDay = 30;
      }
      if (parseInt(this.month) == 12) {
        let isLead = moment(this.year + "/12/30", "jYYYY/jMM/jDD").isValid();
        if (isLead) {
          this.numberOfDay = 30;
        } else this.numberOfDay = 29;
      }

      if (parseInt(this.day) > parseInt(this.numberOfDay)) {
        this.day = this.numberOfDay;
      }
      let date = this.year + "/" + this.month + "/" + "01";

      let day = moment(date, "jYYYY/jMM/jDD").format("d");
      this.numberOfWeekDay = this.daysOfWeek[day];
    },
    selectDate(day) {
      this.selected.year = this.year;
      this.selected.month = this.month;
      this.selected.day = day;
      this.selectedDayTasks();
    },
    selectColor(color) {
      if (this.newTask.color == color) {
        this.newTask.color = "";
      } else {
        this.newTask.color = color;
      }
    },
    setInLocalStorage() {
      localStorage.setItem("allTasks", JSON.stringify(this.allTasks));
    },
    createNewTask() {
      let task = {
        id: uuidv4(),
        title: this.newTask.title,
        color: this.newTask.color,
        done: false,
      };

      if (this.allTasks.length) {
        let index = this.allTasks.findIndex(
          (x) => x.date == this.formalSelectedDate
        );
        if (index > -1) {
          this.allTasks[index].tasks.push(task);
        } else {
          this.allTasks.push({
            date: this.formalSelectedDate,
            tasks: [task],
          });
        }
      } else {
        this.allTasks.push({
          date: this.formalSelectedDate,
          tasks: [task],
        });
      }
      this.setInLocalStorage();
      this.newTask = {
        title: "",
        color: "",
      };
      this.addingTaskDialog = false;
      this.selectedDayTasks();
    },
    toggleCheckbox(item) {
      let dayIndex = this.allTasks.findIndex(
        (x) => x.date == this.formalSelectedDate
      );
      if (dayIndex > -1) {
        let taskIndex = this.allTasks[dayIndex].tasks.findIndex(
          (x) => x.id == item.id
        );
        if (taskIndex > -1) {
          this.allTasks[dayIndex].tasks[taskIndex].done =
            !this.allTasks[dayIndex].tasks[taskIndex].done;
          this.setInLocalStorage();
        }
      }
    },
  },
  computed: {
    computedMonth() {
      return this.monthsName[Number(this.month) - 1];
    },
    computedSpace() {
      let box = document.querySelector("#container");
      return (box.getBoundingClientRect().width - 56 - 45 * 7) / 14;
    },
    computedFirstSpace() {
      let box = document.querySelector("#container");
      let space = (box.getBoundingClientRect().width - 56 - 45 * 7) / 14;
      return (
        "margin-right:" +
        (space * (this.numberOfWeekDay.value * 2 + 1) +
          45 * this.numberOfWeekDay.value) +
        "px; margin-left:" +
        space +
        "px"
      );
    },
    informalSelectedDate() {
      let year = this.selected.year;
      let month = this.selected.month;
      let day = this.selected.day;
      return `${day} ${this.monthsName[Number(month) - 1]} ${year}`;
    },
    formalSelectedDate() {
      let year = this.selected.year;
      let month = this.selected.month;
      let day = this.selected.day;
      return `${year}/${month}/${day}`;
    },
  },
};
</script>

<style lang="scss">
.container {
  position: relative;
  .weekday-box {
    width: 45px;
  }
  .day-box {
    width: 45px;
    height: 40px;
    color: #656a81;
    font-size: 0.8rem;
    div {
      width: 32px;
      height: 32px;
      align-items: center;
      &.outline-box {
        border-radius: 50% !important;
        outline: 2px solid #9e664f;
        @media only screen and (max-width: 600px) {
          outline-offset: 2px;
        }
        outline-offset: 3px;
        color: #9e664f;
      }
    }
  }
  .tasks-box {
    background: rgb(243, 204, 185);
    background: linear-gradient(
      200deg,
      rgba(243, 204, 185, 1) 0%,
      rgb(255, 243, 237) 100%
    );
    height: calc(100vh - 420px);
    border-radius: 30px 30px 0 0;
    transition: 0.3s height;

    &.open-box {
      height: 100vh;
      border-radius: 0;
    }
    &.close-box {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      height: 0;
      overflow: hidden;
      border-radius: 0;
    }
    .no-task {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -10%);
      width: 100%;
    }
    .add-button {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
  }
}
.color-pallet-container {
  width: 100%;
  height: 56px;
  border-radius: 50px !important;
  margin: 0px auto !important;
  padding: 0 15px;
  .color-pallet {
    height: 40px !important;
    width: 40px !important;
    border-radius: 50% !important;
    margin: 7px 5px;
    box-shadow: inset 0 4px 4px rgba($color: #000000, $alpha: 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
