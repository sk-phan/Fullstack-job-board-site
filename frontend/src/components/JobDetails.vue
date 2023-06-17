<template>
    <v-row class="bg-white ma-0">
        <v-col>
            <v-col>
                <div class="d-flex flex-row justify-space-between">
                    <h2 class="mb-4">Marketing manager</h2>
                    <div>
                        <v-btn class="icon-btn pa-0 mr-4" text>
                            <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn class="icon-btn pa-0" text>
                            <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                    </div>
                </div>
                <p>
                    We are looking for a skilled and passionate software developer to join our dynamic team. As a software developer at our company, you will have the opportunity to work on exciting and challenging projects that will make a real impact. You will be responsible for designing, developing, and maintaining high-quality software solutions that meet our clients' needs.\n\nIn this role, you will collaborate closely with cross-functional teams to understand project requirements, analyze system specifications, and translate them into well-designed software solutions. You will write clean, efficient, and maintainable code using industry best practices. Additionally, you will be involved in testing and debugging applications to ensure they meet quality standards.\n\nTo succeed in this role, you should have a solid foundation in software development principles and a strong proficiency in programming languages such as Java and JavaScript. Experience with database management systems, such as SQL, is highly desirable. You should have a keen eye for detail and possess excellent problem-solving and analytical skills.\n\nWe offer a competitive salary and a comprehensive benefits package to our software developers. As part of our team, you will have the opportunity for professional growth and advancement. We believe in fostering a collaborative and inclusive work environment where innovation and creativity thrive. Join us in shaping the future of software development!"
                </p>
            </v-col>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "JobDetails",
    data() {
        return {
            job: null
        }
    },
    created() {
        this.job = {...this.$store.state.currentJob}
    }
}
</script>

<style lang="scss" scoped>
    .bg-white {
        background: #fff !important;
        min-height: 100vh !important;
    }

    .icon-btn {
        min-width: 0 !important;
    }
</style>