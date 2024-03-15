<!-- NavBar.vue -->
<template>
    <aside :class="{ 'is-expanded': is_expanded }">
        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="toggleMenu">
                <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
            </button>
        </div>
        <div class="menu">
            <div id="sidebar">
                <SidebarHeader />
                <ul id="navigation">
                    <li v-for="(item, index) in navigation" :key="'item' + index">
                        <div
                            class="title"
                            @click="stoggleItem(index, item)"
                            v-bind:class="{
                                'active-link': checkActive(index, item.link)
                            }"
                        >
                            <i v-if="item.icon" class="material-symbols-outlined">home</i>
                            <router-link v-if="item.link" :to="item.link">
                                <span>{{ item.title }}</span>
                            </router-link>
                            <span v-else>{{ item.title }}</span>
                            <i
                                v-if="item.subnav"
                                class="material-symbols-outlined dropdown-icon"
                                :class="{
                                    'rotate-down': !item.open,
                                    'rotate-up': item.open
                                }"
                            >
                                arrow_drop_down
                            </i>
                        </div>
                        <SubNav v-if="item.subnav" :list="item" :depth="0" />
                        <!-- depth is for indenting submenu but not initialized. future feature. -->
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>
<script>
import { ref, computed } from 'vue'
import SidebarHeader from './SidebarHeader.vue'
import SubNav from './SubNav.vue'
import { useStore } from '@/stores/navigation'

export default {
    components: {
        SidebarHeader,
        SubNav
    },
    setup() {
        const navstore = useStore()
        const is_expanded = computed(() => navstore.isExpanded)

        //get navigation menu from pinia
        const navigation = computed(() => navstore.getNavigation)

        const toggleItem = (item) => {
            item.open = !item.open
        }

        const toggleMenu = () => {
            navstore.toggleExpanded() // Use the action to toggle the isExpanded state
        }

        const handleMenuItemClicked = (index, isOpen) => {
            navigation.value.forEach((item, i) => {
                if (i !== index) {
                    item.open = false
                }
            })
        }

        const checkActive = (index, link) => {
            const activeMenuValue = parseInt(index) + link
            return activeMenuValue === navstore.activemenu
        }

        const stoggleItem = (index, item) => {
            const closeSubnavRecursively = (items) => {
                items.forEach((item) => {
                    item.open = false
                    if (item.subnav) {
                        closeSubnavRecursively(item.subnav)
                    }
                })
            }

            navigation.value.forEach((item, i) => {
                if (i !== index) {
                    item.open = false
                    if (item.subnav) {
                        closeSubnavRecursively(item.subnav)
                    }
                }
            })

            navigation.value[index].open = !navigation.value[index].open
            if (!navigation.value[index].hasOwnProperty('subnav')) {
                const activeMenuValue = parseInt(index) + item.link
                navstore.setActivemenu(activeMenuValue)
            }
        }

        return {
            is_expanded,
            toggleMenu,
            handleMenuItemClicked,
            navigation,
            toggleItem,
            stoggleItem,
            checkActive
        }
    }
}
</script>

<style lang="scss" scoped>
aside {
    position: fixed;
    top: 5px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--menubackground);
    width: calc(2rem + 2rem);
    overflow: hidden;
    //min-height: 80vh;
    height: 100vh;
    bottom: 5px;
    transition: 0.2s ease-in-out;
    box-shadow: 1rem 0 2rem rgba($color: #000000, $alpha: 0.4);

    .menu-toggle-wrap {
        display: flex;
        padding: 0;
        justify-content: flex-end;
        margin-bottom: 0rem;
        position: relative;
        top: 1rem;
        transition: 0.2s ease-in-out;

        .menu-toggle {
            display: flex;
            align-items: center;
            margin-left: auto;
            top: 1rem;

            .material-symbols-outlined {
                font-variation-settings:
                    'FILL' 1,
                    'wght' 400,
                    'GRAD' 0,
                    'opsz' 24;
                font-family: 'Material Symbols Outlined';
                font-size: 3rem;
                margin-right: 0.5rem;
                color: var(--menuiconcolor);
                transition: 0.2s ease-out;
            }

            &:hover {
                .material-symbols-outlined {
                    color: var(--menuhovercolor);
                    transform: translateX(0.5rem);
                }
            }
        }
    }

    .menu {
        #sidebar {
            width: 100%;
            max-width: 35rem;
            background-color: var(--menubackground);
        }

        #navigation {
            list-style: none;
            border-bottom: 0.05rem solid var(--seperatorcolor);

            li {
                position: relative;
                border-top: 0.05rem solid var(--seperatorcolor);
                cursor: pointer;
                text-decoration: none;
                white-space: nowrap;
                text-align: right;

                .title {
                    display: flex;
                    align-items: center;
                    font-size: 1.6rem;
                    text-align: left;
                    justify-content: space-between;
                    padding: 1rem 0.5rem 1rem 0.5rem;
                    height: 3.5rem;
                    transition: background-color 0.3s ease;

                    &:hover {
                        background-color: var(--menuhovercolor);
                        transition: background-color 0.5s ease;
                    }

                    .material-symbols-outlined {
                        /*font-variation-settings:
                            'FILL' 0,
                            'wght' 200,
                            'GRAD' 100,
                            'opsz' 24;*/
                        font-family: 'Material Symbols Outlined';
                        font-size: 2.5rem;
                        justify-content: center;
                        color: var(--menuiconcolor);
                        margin-left: auto;
                    }
                    .dropdown-icon {
                        /*font-variation-settings:
                            'FILL' 0,
                            'wght' 400,
                            'GRAD' 100,
                            'opsz' 24;*/
                        font-family: 'Material Symbols Outlined';
                        color: var(--dropdownmenucolor);
                        font-size: 3rem;

                        &.rotate-down {
                            transform: rotate(0deg);
                            transition: transform 0.3s ease;
                        }

                        &.rotate-up {
                            transform: rotate(-180deg);
                            transition: transform 0.3s ease;
                            color: #1fda07;
                        }
                    }

                    &.active-link {
                        border-right: solid 0.4rem var(--activeborder);
                        background-color: var(--activebackground);
                        //	background-color: rgb(6, 83, 12);
                    }

                    a {
                        flex: 1;
                        text-decoration: none;
                    }

                    span {
                        flex: 1;
                        color: var(--menutext);
                        text-decoration: none;
                        text-align: left;
                        margin-left: 1rem;
                    }
                }
            }
        }
    }

    &.is-expanded {
        width: var(--expanded-sidebar-width);
        z-index: 1000;

        .menu-toggle-wrap {
            top: 0.6rem;

            .menu-toggle {
                transform: rotate(-180deg);
            }
        }
    }

    @media (max-width: 1024px) {
        position: absolute;
        z-index: 99;
    }
}
</style>
