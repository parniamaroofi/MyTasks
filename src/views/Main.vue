<template>
  <div class="container px-5 h-screen" id="container">
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
              @click="selectDate(number, calendarType)"
              :class="
                year == currentYear &&
                month == currentMonth &&
                number == Number(currentDay)
                  ? 'primary white--text'
                  : ''
              "
            >
              {{ number }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="tasks-box shadow secondary py-2 px-8 absolute bottom-0 left-0 w-full"
        :class="openBox ? 'open-box' : ''"
      >
        <div class="text-center mb-1">
          <span @click="openBox = !openBox">
            <v-icon v-if="!openBox" color="primary" large
              >mdi-chevron-up</v-icon
            >
            <v-icon v-else color="primary" large>mdi-chevron-down</v-icon>
          </span>
        </div>
        <!-- <p class="primary--text text-xl">کارهای من</p> -->
        <p class="no-task text-center text-lg text-gray-500">
          تسکی افزوده نشده است!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment-jalaali";
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
      weekDays: ["ش", "ی", "د", "س", "چ", "پ", "ج"],
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
      pageLoaded: false,
      openBox: false,
    };
  },

  mounted() {
    this.getNumberOfDays();
    setTimeout(() => {
      this.pageLoaded = true;
    }, 100);
  },

  methods: {
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
  },
  computed: {
    computedMonth() {
      return this.monthsName[Number(this.month) - 1];
    },
    computedSpace() {
      let box = document.querySelector("#container");
      return (box.getBoundingClientRect().width - 40 - 45 * 7) / 14;
    },
    computedFirstSpace() {
      let box = document.querySelector("#container");
      let space = (box.getBoundingClientRect().width - 40 - 45 * 7) / 14;
      return (
        "margin-right:" +
        (space * (this.numberOfWeekDay.value * 2 + 1) +
          45 * this.numberOfWeekDay.value) +
        "px; margin-left:" +
        space +
        "px"
      );
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
    font-size: 0.85rem;
    div {
      width: 32px;
      height: 32px;
      align-items: center;
      &:hover {
        background-color: #eeeeee;
        color: #656a81;
      }
    }
  }
  .tasks-box {
    height: calc(100vh - 404px);
    border-radius: 30px 30px 0 0;
    transition: 0.3s all;
    &.open-box {
      height: 100vh;
    }
    .no-task {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }
  }
}
</style>
