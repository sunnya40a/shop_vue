<!-- DropDown.vue -->
<template>
    <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
        <ul v-if="list.open" class="sub-items">
            <li class="sub-item" v-for="(item, index) in list.subnav" :key="'item' + index">
                <div
                    class="title"
                    @click="toggleSubItem(index)"
                    :class="{
                        'active-link': activemenu === index && item.link
                    }"
                >
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
                    <router-link v-if="item.link" :to="item.link">
                        <span>{{ item.title }}</span>
                    </router-link>
                    <span v-else>{{ item.title }}</span>
                </div>
                <DropDown class="subnav" v-if="item.subnav" :list="item" />
            </li>
        </ul>
    </transition>
</template>
<script setup>
import { ref } from 'vue'

const activemenu = ref(null)

const enter = (el) => {
    el.style.height = 'auto'
    const height = getComputedStyle(el).height
    el.style.height = 0
    getComputedStyle(el)
    setTimeout(() => {
        el.style.height = height
    })
}

const afterEnter = (el) => {
    el.style.height = 'auto'
}

const leave = (el) => {
    el.style.height = getComputedStyle(el).height
    getComputedStyle(el)
    setTimeout(() => {
        el.style.height = 0
    })
}

const toggleSubItem = (list, index) => {
    list.subnav.forEach((item, i) => {
        if (i !== index) {
            item.open = false
        }
    })

    list.subnav[index].open = !list.subnav[index].open
    // Check for subnav property using the `in` operator
    if (!('subnav' in list.subnav[index])) {
        activemenu.value = index
    }
    // if (!list.subnav[index].hasOwnProperty('subnav')) {
    //     activemenu.value = index
    // }
}
</script>

<style lang="scss" scoped>
.sub-items {
    list-style: none;
    padding-left: 0;

    .sub-item {
        position: relative;
        background-color: #14416c;
        cursor: pointer;

        .title {
            position: relative;
            display: flex;
            align-items: center;
            font-size: 1.6rem;
            text-align: left;
            justify-content: space-between;
            padding: 1rem 0.5rem 1rem 3.2rem;
            height: 3.5rem;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: var(--menuhovercolor);
                transition: background-color 0.1s ease;
            }
            .dropdown-icon {
                /*font-variation-settings:
                    'FILL' 0,
                    'weight' 400,
                    'GRAD' 100,
                    'opsz' 24;*/
                font-family: 'Material Symbols Outlined';
                color: var(--dropdownmenucolor);
                font-size: 3rem;
                text-align: left;
                //border-radius: 90%;

                &.rotate-down {
                    transform: rotate(0deg);
                    transition: transform 0.3s ease;
                    //color: #feb236;
                    //box-shadow: 0 0 10px rgba(255, 0, 0, 1);
                }
                &.rotate-up {
                    transform: rotate(-180deg);
                    transition: transform 0.3s ease;
                    color: #1fda07;
                    //box-shadow: 0 0 10px rgba(255, 0, 0, 1);
                }
            }

            &.active-link {
                border-right: solid 0.4rem var(--activeborder);
                background-color: red;
            }

            span {
                flex: 1;
                color: var(--menutext);
                text-decoration: none;
                text-align: left;
                margin-left: 1rem;
            }
        }

        &.active-link {
            border-right: solid 0.4rem var(--activeborder);
            background-color: var(--activebackground);
        }
    }

    a {
        flex: 1;
        text-decoration: none;
    }
    .subnav {
        border: 0.5rem 0rem 0.5rem 0rem solid #0a1283;
        .sub-item {
            position: relative;
            background-color: #0e2e4d;
            cursor: pointer;
            .title {
                position: relative;
                display: flex;
                align-items: center;
                font-size: 1.6rem;
                text-align: left;
                justify-content: space-between;
                padding: 1rem 0.5rem 1rem 5.8rem;
                height: 3.5rem;
                transition: background-color 0.3s ease;
            }
        }
    }
}

.expand-enter-active,
.expand-leave-active {
    transition: height 0.2s ease-in-out;
    overflow: hidden;
}
</style>
