type CourseCommon = {
  id: number
  imgs: string[]
  name: string
  rating: number
  difficulty: string
  distance: number
  address: string
}

type CourseDetailCommon = {
  elevationGain: number
  avgCompleteTime: number // 분 단위
}

type HikingCourse = {} & CourseCommon

type HikingCourseDetail = {} & HikingCourse & CourseDetailCommon

type CyclingCourse = {} & CourseCommon

type CyclingCourseDetail = {} & CyclingCourse & CourseDetailCommon

type RunningCourse = {} & CourseCommon

type RunningCourseDetail = {} & RunningCourse & CourseDetailCommon

type Course = HikingCourse | CyclingCourse | RunningCourse

type CourseDetail =
  | HikingCourseDetail
  | CyclingCourseDetail
  | RunningCourseDetail

export {
  CourseCommon,
  HikingCourse,
  CyclingCourse,
  RunningCourse,
  Course,
  CourseDetailCommon,
  RunningCourseDetail,
  HikingCourseDetail,
  CyclingCourseDetail,
  CourseDetail,
}
