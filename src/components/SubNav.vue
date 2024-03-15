<template>
    <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave">
        <ul v-if="list.open" class="sub-items">
            <li class="sub-item" v-for="(item, index) in list.subnav" :key="'item' + index">
                <div
                    class="title"
                    @click="toggleSubItem(item, index)"
                    v-bind:class="{
                        'active-link': checkActive(index, item.link)
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
                <SubNav class="subnav" v-if="item.subnav" :list="item" />
            </li>
        </ul>
    </transition>
</template>

<script>
import { useStore } from '@/stores/navigation'
export default {
    name: 'SubNav',
    props: ['list', 'depth'],

    data() {
        return {}
    },
    methods: {
        enter(el) {
            // set the element to his natural hight
            el.style.height = 'auto'
            /*
          get the calculated height.
          getComputedStyle returns an object containing all the CSS properties
          of the element after all active styles have been loaded and the basic
          calculations have been performed.
          We need the height after all basic calculations have been performed,
          then the height of each element here is dynamically,
          based on the number of items in the sublist.
        */
            const height = getComputedStyle(el).height
            // set the height to zero for the opening animation
            el.style.height = 0
            /*
          Force the repaint to make sure the animation is triggered correctly,
          then you can fire the method getComputedStyle again.
          This is not necessary, but sometimes the animation may not start depending on the case.
        */
            getComputedStyle(el)
            /*
          Set the height from the element to the calculated height.
          With setTimeout you make sure the browser has finished the painting
          after setting the height to zero.
        */
            setTimeout(() => {
                el.style.height = height
            })
        },
        afterEnter(el) {
            el.style.height = 'auto'
        },
        leave(el) {
            /*
          Same as with the enter method, but only the other way around.
        */
            el.style.height = getComputedStyle(el).height
            getComputedStyle(el)
            setTimeout(() => {
                el.style.height = 0
            })
        },

        toggleSubItem(item, index) {
            const navigation = useStore()

            // If the clicked item does not have sub-navigation, update activemenu with its link
            if (!item.subnav) {
                const activeMenuValue = parseInt(index) + item.link
                navigation.setActivemenu(activeMenuValue)
                return
            }

            // Toggle the 'open' property of the clicked submenu item
            item.open = !item.open

            // Recursively close other sub-menus within the same level and their submenus
            const closeSubmenus = (subItems) => {
                subItems.forEach((subItem) => {
                    if (subItem !== item) {
                        subItem.open = false
                    }
                    if (subItem.subnav) {
                        closeSubmenus(subItem.subnav)
                    }
                })
            }

            // Close other sub-menus within the same level and their submenus
            this.list.subnav.forEach((subItem) => {
                if (subItem !== item) {
                    subItem.open = false
                }
                if (subItem.subnav) {
                    closeSubmenus(subItem.subnav)
                }
            })
        },
        checkActive(index, link) {
            const navigation = useStore()
            const activeMenuValue = parseInt(index) + link
            return activeMenuValue === navigation.activemenu
        }
    }
}
</script>

<style lang="scss" scoped>
/*
    CSS definitions for the sublist
  */
.sub-items {
    list-style: none;
    padding-left: 0px;
    margin-left: 30px;

    .sub-item {
        border-top: 1px solid var(--seperatorcolor); //
        color: #fefefe; //
        position: relative;
        background-color: #14416c;
        cursor: pointer;

        .subnav {
            //padding-left: 20px;
            margin-left: 30px;
        }

        .title {
            //padding: 5px 0;
            //text-indent: 30px;
            //margin-left: 15px;

            position: relative;
            display: flex;
            align-items: center;
            font-size: 1.6rem;
            text-align: left;
            justify-content: space-between;
            //padding: 1rem 0.5rem 1rem 3.2rem;
            height: 3.5rem;
            transition: background-color 0.3s ease;
            &:hover {
                background-color: var(--menuhovercolor);
                transition: background-color 0.5s ease;
            }
            .dropdown-icon {
                font-variation-settings:
                    'FILL' 0,
                    'weight' 400,
                    'GRAD' 100,
                    'opsz' 24;
                font-family: 'Material Symbols Outlined';
                color: var(--dropdownmenucolor);
                font-size: 3rem;
                text-align: right;
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
                background-color: var(--activebackground);
                //	background-color: rgb(6, 83, 12);
            }
            span {
                flex: 1;
                color: var(--menutext);
                text-decoration: none;
                text-align: left;
                margin-left: 1rem;
            }
        }
        a {
            flex: 1;
            text-decoration: none;
        }
        .subnav {
            //border: 0.5rem 0rem 0.5rem 0rem solid #0a1283;
            margin-left: 30px;
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
                    //padding: 1rem 0.5rem 1rem 5.8rem;
                    height: 3.5rem;
                    transition: background-color 0.3s ease;
                }
            }
        }
    }
}
/*
    The CSS classes for the opening and closing animation.
  */
.expand-enter-active,
.expand-leave-active {
    transition: height 0.5s ease-in-out;
    overflow: hidden;
}
</style>
