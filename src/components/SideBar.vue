<!-- Sidebar4.vue -->
<template>
    <aside :class="{ 'is-expanded': is_expanded }">
        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="ToggleMenu">
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
                            @click="toggleItem(index)"
                            :class="{
                                'active-link': activemenu === index && item.link
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
                        <DropDown v-if="item.subnav" :list="item" />
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>
import SidebarHeader from './SidebarHeader.vue'
import DropDown from './DropDown.vue'

export default {
    data() {
        return {
            is_expanded: localStorage.getItem('is_expanded') === 'true',
            activemenu: null,
            navigation: [
                {
                    title: 'Dashboard',
                    open: false,
                    icon: 'address-card',
                    link: '/home'
                },
                {
                    title: 'Purchase',
                    icon: 'address-card',
                    open: false,
                    link: '/purchase'
                },
                {
                    title: 'Category',
                    icon: 'address-card',
                    open: false,
                    link: '/category'
                },
                {
                    title: 'Table',
                    icon: 'address-card',
                    open: false,
                    link: '/table'
                },
                {
                    title: 'Plug Table',
                    icon: 'address-card',
                    open: false,
                    link: '/ptable'
                },

                {
                    title: 'Logout',
                    icon: 'address-card',
                    open: false,
                    link: '/logout'
                }
            ],

            // navigation: [
            // 	{
            // 		title: 'Dashboard',
            // 		open: false,
            // 		icon: 'address-card',
            // 		link: '/home',
            // 	},
            // 	{
            // 		title: 'Purchase',
            // 		icon: 'address-card',
            // 		open: false,
            // 		subnav: [
            // 			{
            // 				title: 'Purchase Orders',
            // 				link: '/purchaseorder',
            // 			},
            // 			{
            // 				title: 'Purchase History',
            // 				link: '/purchasehistory',
            // 			},
            // 			{ title: 'Vendor Information', link: '/vendor' },
            // 			{
            // 				title: 'Delivery Tracking',
            // 				link: '/deliverytracking',
            // 			},
            // 		],
            // 	},
            // 	{
            // 		title: 'Daily Sales',
            // 		icon: 'address-card',
            // 		open: false,
            // 		link: '/sale',
            // 	},
            // 	{
            // 		title: 'Reports',
            // 		icon: 'address-card',
            // 		open: false,
            // 		subnav: [
            // 			{
            // 				title: 'Sales Reports',
            // 				open: false,
            // 				subnav: [
            // 					{
            // 						title: 'Weekly Sales',
            // 						link: '/weeklysale',
            // 					},
            // 					{
            // 						title: 'Monthly Sales',
            // 						link: '/monthlysale',
            // 					},
            // 					{
            // 						title: 'Top Selling Products',
            // 						link: '/topsellingproducts',
            // 					},
            // 					{
            // 						title: 'Low Performing Products',
            // 						link: '/loperformingproducts',
            // 					},
            // 				],
            // 			},
            // 			{
            // 				title: 'Inventory Reports',
            // 				open: false,
            // 				subnav: [
            // 					{
            // 						title: 'Current Stock Levels',
            // 						link: '/stocklevels',
            // 					},
            // 					{
            // 						title: 'Reorder Suggestions',
            // 						link: '/ordersuggestion',
            // 					},
            // 					{
            // 						title: 'Slow-Moving Items',
            // 						link: '/slowmovingitems',
            // 					},
            // 					{
            // 						title: 'Low Performing Products',
            // 						link: '/lowperforming',
            // 					},
            // 				],
            // 			},
            // 			{
            // 				title: 'Financial Reports',
            // 				open: false,
            // 				subnav: [
            // 					{
            // 						title: 'Expense Reports',
            // 						link: '/expensereport',
            // 					},
            // 					{
            // 						title: 'Profit and Loss Statement',
            // 						link: '/profitloss',
            // 					},
            // 					{
            // 						title: 'Revenue Breakdown',
            // 						link: '/revenuebreakdown',
            // 					},
            // 				],
            // 			},
            // 			{
            // 				title: 'Supplier Reports',
            // 				open: false,
            // 				subnav: [
            // 					{
            // 						title: 'Purchase Order History',
            // 						link: '/purchasehistory',
            // 					},
            // 					{
            // 						title: 'Supplier Payments',
            // 						link: '/supplierpayment',
            // 					},
            // 				],
            // 			},
            // 			{
            // 				title: 'Purchase Order History',
            // 				link: '/purchasehistory',
            // 			},
            // 		],
            // 	},
            // ],
            activemenu: null
        }
    },
    methods: {
        ToggleMenu() {
            this.is_expanded = !this.is_expanded
            localStorage.setItem('is_expanded', this.is_expanded.toString())
        },
        handleMenuItemClicked(index, isOpen) {
            // Close other menus when a menu item is clicked
            this.list.subnav.forEach((item, i) => {
                if (i !== index) {
                    this.closeSubItems(item)
                }
            })

            // Set activemenu based on the clicked menu item
            this.activemenu = isOpen ? index : null
        },
        toggleItem(index) {
            const closeSubnavRecursively = (items) => {
                items.forEach((item) => {
                    item.open = false
                    if (item.subnav) {
                        closeSubnavRecursively(item.subnav)
                    }
                })
            }

            // Close other items and their subnav recursively
            this.navigation.forEach((item, i) => {
                if (i !== index) {
                    item.open = false
                    if (item.subnav) {
                        closeSubnavRecursively(item.subnav)
                    }
                }
            })

            // Toggle the clicked item
            this.navigation[index].open = !this.navigation[index].open
            if (!this.navigation[index].hasOwnProperty('subnav')) {
                this.activemenu = index
            }
        }
    },
    components: {
        SidebarHeader,
        DropDown
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
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
                    color: var(--activebackground);
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
                        transition: background-color 0.1s ease;
                    }

                    .material-symbols-outlined {
                        font-variation-settings:
                            'FILL' 0,
                            'wght' 200,
                            'GRAD' 100,
                            'opsz' 24;
                        font-family: 'Material Symbols Outlined';
                        font-size: 2.5rem;
                        justify-content: center;
                        color: var(--menuiconcolor);
                        margin-left: auto;
                    }
                    .dropdown-icon {
                        font-variation-settings:
                            'FILL' 0,
                            'wght' 400,
                            'GRAD' 100,
                            'opsz' 24;
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
