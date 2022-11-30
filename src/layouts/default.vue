<script setup lang="ts">
const items = reactive(
    [
        { title: 'Sentiment Analysis', icon: 'mdi-heart', link:'/sentiment' },
        { title: 'Content Analysis', icon: 'mdi-brain', link:'/content' },
        { title: 'Translate', icon: 'mdi-translate', link: '/translate' },
        { title: 'Speech', icon: 'mdi-voicemail', link: '/speech'},
        { title: 'Syntax', icon: 'mdi-pen', link: '/syntax'}
    ]
)
const drawer = ref(false)
const inset = ref(false)
const footer = ref(true)
const { state } = useState()
const title = ref("Natural Language Processing")
</script>
<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped fixed temporary bg-success dark:bg-secondary >    
            <v-list dense>
               
                <v-list-item v-for="item in items" row start :key="item.title" link>
                    <RouterLink :to="item.link" text-accent dark:text-success>
                    <Ico :icon="item.icon" mx-2  />
                    {{ item.title }}
                </RouterLink>
                </v-list-item>
           
            </v-list>
        </v-navigation-drawer>
        <v-main class="pa-4">

            <v-app-bar app clipped-left justify-evenly  bg-success dark:bg-info  >
                <Ico icon="mdi-menu" m-2 x2 btn-icon dark:text-success  @click="drawer = !drawer" />
                <v-title class="row center mx-auto text-title">{{ title }}</v-title>
                <Ico :icon="!isDark ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off'" v-if="state.user" @click.stop="toggleDark()" x2 m-2 btn-icon
                rounded-none dark:text-success />
            </v-app-bar>
            <v-container fluid>
                <RouterView />
            </v-container>
            <v-footer app :inset="inset">
                <span text-secondary z-50>&copy; 2022 by Oscar Bahamonde</span>
                <VueTerm v-if="state.user && footer" />
                <Auth />
            </v-footer>
        </v-main>
    </v-app>
</template>
