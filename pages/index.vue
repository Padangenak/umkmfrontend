<template>
	<div class="md:pb-20">
		<img src="https://umkmbackend.cloudoffice.web.id/images/AAW4DATR6bagEAmfs4XqVcJl7rvFqBKpUgnn0LUg.jpg">
		<div class="card flex justify-content-center">
			<Dialog
				v-model:visible="visible"
				modal
				header="Cari Produk"
				class="md:w-[50vw] max-md:w-[80vw]"
			>
				<div class="card flex flex-wrap justify-content-center gap-3 py-3">
					<span class="p-input-icon-left w-full">
						<SearchOutline class="w-4" />
						<InputText v-model="search" placeholder="Search" class="w-full" />
					</span>
					<div class="h-72 overflow-y-auto w-full">
						<div
							v-if="search == ''"
							class="select-none text-gray-400 flex justify-center items-center w-full h-full"
						>
							<SearchOutline class="w-6" />
							<p class="text-2xl font-semibold flex px-2">Cari</p>
						</div>
						<div v-if="search != ''">
							<NuxtLink :to="`/selected/${i.id}`" v-for="i in searchData">
								<div
									class="flex cursor-pointer hover:bg-gray-100 p-5 rounded items-center"
								>
									<div
										class="w-16 h-16 bg-cover bg-center rounded-full"
										:style="{
											'background-image': `url('${STORAGE_API}/${i.attachment.filename}')`,
										}"
									/>
									<div class="px-5">
										<p class="font-semibold">
											{{ i.product }}
										</p>
										<div v-if="i.discon == 0">
											<p class="font-semibold text-red-600">
												{{ rupiah(i.price) }}
											</p>
										</div>

										<div v-else>
											<p
												class="text-sm text-gray-400 leading-none line-through"
											>
												{{ rupiah(i.price) }}
												<small class="">/pcs</small>
											</p>
											<p class="text-base text-red-600 leading-none">
												{{ rupiah(discon(i)) }}
												<small class="text-gray-600">/pcs</small>
												<span
													class="text-xs bg-red-600 text-white px-1 mx-2"
													v-if="i.discon != 0"
													>{{ i.discon }}%</span
												>
											</p>
										</div>
									</div>
								</div>
							</NuxtLink>
						</div>
					</div>
				</div>
			</Dialog>
		</div>
		<div class="w-full">
			<div class="w-full md:flex">
				<div
					class="max-md:w-full md:w-6/12 h-[50vh] md:px-20 max-md:px-5 py-10"
				>
					<NuxtLink to="/" class="text-2xl font-black w-fit">
						UMKM AJAIB
					</NuxtLink>
					<div class="flex items-center h-5/6">
						<div class="w-full">
							<div>
								<h1>Cari Produk</h1>
							</div>
							<div class="w-full" v-if="loading">
								<div class="skeleton w-full h-10"></div>
							</div>
							<div class="flex w-full" v-else>
								<div class="w-full">
									<input
										type="text"
										name=""
										class="w-full py-2 px-3 rounded-l border-t-4 border-b-4 border-l-4"
										placeholder="Cari Produk"
										@click="visible = true"
									/>
								</div>
								<div>
									<button class="rounded-r h-full px-3 border-4 hover:">
										<SearchOutline class="text-black w-5" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="max-md:hidden w-6/12 px-20 py-10">
					<div
						class="flex justify-center items-center h-full text-gray-900 rounded"
					>
						<div class="w-full h-full text-center px-10 py-5">
							<h1>Daily Quotes</h1>
							<div
								class="w-full h-full text-xl flex justify-center items-center font-black rounded"
							>
								<p>Jangan Lupa Shalat</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="max-md:px-5 md:px-20">
				<h1 class="text-lg font-semibold">Produk</h1>
				<div class="mt-5 gap-3 flex">
					<button
						class="px-3 py-2 border border-gray-500 rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition"
						:class="{
							'bg-red-600 text-white border-red-600': selectedType == 'all',
						}"
						@click="selectedType = 'all'"
					>
						Semua
					</button>
					<button
						class="px-3 py-2 border border-gray-500 rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition"
						:class="{
							'bg-red-600 text-white border-red-600': selectedType == 'food',
						}"
						@click="selectedType = 'food'"
					>
						Makanan
					</button>
					<button
						class="px-3 py-2 border border-gray-500 rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition"
						:class="{
							'bg-red-600 text-white border-red-600': selectedType == 'item',
						}"
						@click="selectedType = 'item'"
					>
						Barang
					</button>
				</div>
				<div class="md:flex gap-3">
					<div>
						<select
							class="border border-gray-500 rounded px-2 py-2 my-3 cursor-pointer"
							v-model="provincesSelect"
						>
							<option class="cursor-pointer" value="">Provinsi</option>
							<option
								class="cursor-pointer"
								v-for="(addressOne, index) in address"
							>
								{{ addressOne.name }}
							</option>
						</select>
					</div>
					<div>
						<select
							class="border border-gray-500 rounded px-2 py-2 md:mt-3 mb-3 cursor-pointer"
							v-model="regenciesSelect"
							v-if="provincesSelect != ''"
						>
							<option class="cursor-pointer" value="">Kab/Kota</option>
							<option
								class="cursor-pointer"
								v-for="(addressTwo, index) in regencies"
							>
								{{ addressTwo.name }}
							</option>
						</select>
					</div>
				</div>
				<div
					class="flex grid max-md:grid-cols-2 md:grid-cols-5 gap-5"
					v-if="loading"
				>
					<div v-for="i in 5" class="">
						<div class="bg-gray-300 h-52 rounded-t skeleton" />
						<div class="px-2">
							<div class="w-full h-4 bg-gray-300 my-2 rounded skeleton"></div>
							<div class="w-full h-4 bg-gray-300 mt-3 rounded skeleton"></div>
							<div class="w-full h-3 bg-gray-300 my-2 rounded skeleton"></div>
						</div>
					</div>
				</div>

				<div v-if="loading == false">
					<Transition name="fade">
						<div v-if="selectedType == 'all'">
							<ValidationLocation
								:datas="datas.more.all"
								v-if="regenciesSelect == ''"
							/>
							<ValidationLocation :datas="datas.more.location.all" v-else />
							<div class="flex justify-center mt-10">
								<Button
									outlined
									severity="danger"
									@click="loadMore"
									v-if="moreButton"
									>Load More</Button
								>
							</div>
						</div>
					</Transition>
					<Transition name="fade">
						<div v-if="selectedType == 'food'">
							<ValidationLocation
								:datas="datas.more.food"
								v-if="regenciesSelect == ''"
							/>
							<ValidationLocation :datas="datas.more.location.food" v-else />
							<div class="flex justify-center mt-10">
								<Button
									outlined
									severity="danger"
									@click="loadMore"
									v-if="moreButton"
									>Load More</Button
								>
							</div>
						</div>
					</Transition>
					<Transition name="fade">
						<div v-if="selectedType == 'item'">
							<ValidationLocation
								:datas="datas.more.item"
								v-if="regenciesSelect == ''"
							/>
							<ValidationLocation :datas="datas.more.location.item" v-else />
							<div class="flex justify-center mt-10">
								<Button
									outlined
									severity="danger"
									@click="loadMore"
									v-if="moreButton"
									>Load More</Button
								>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript" setup>
import { SearchOutline } from "@vicons/ionicons5";
import { ref, onMounted, onBeforeMount, watch, watchEffect } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const { ROUTE_LIST, STORAGE_API } = apiData();
let loading = ref(false);

let datas = ref({
	all: [],
	food: [],
	item: [],
	location: { all: [], food: [], item: [] },
	more: {
		all: [],
		food: [],
		item: [],
		location: { all: [], food: [], item: [] },
	},
});
let searchData = ref([]);
let address = ref([]);
let regencies = ref([]);
let more = ref(true);
let selectedType = ref("all");
let moreButton = ref(true);
let provincesSelect = ref("");
let regenciesSelect = ref("");

watchEffect(async () => {
	loading.value = true;
	await $fetch(ROUTE_LIST.PRODUCT_GET)
		.then((val) => {
			datas.value.food.push(...val.food);
			datas.value.item.push(...val.item);
			datas.value.all.push(...val.all);
		})
		.catch((error) => error.data)
		.finally(() => {
			loading.value = false;
		});
	await $fetch("/api/provinces.json").then((val) => address.value.push(...val));

	for (let i = 0; i < 10; i++) {
		datas.value.all[i] ? datas.value.more.all.push(datas.value.all[i]) : "";
		datas.value.food[i] ? datas.value.more.food.push(datas.value.food[i]) : "";
		datas.value.item[i] ? datas.value.more.item.push(datas.value.item[i]) : "";
	}
	if (regenciesSelect.value != "") {
		moreButtonLocation();
	} else {
		moreButtonMore();
	}
});

const visible = ref(false);
const search = ref("");
watch(search, () => {
	if (search.value != "") {
		let filterData = datas.value.all.filter((val) => {
			let searchLower = search.value.toLowerCase();
			let productLower = val.product.toLowerCase();
			for (let i = 0; i < productLower.length; i++) {
				let currentI = i + 1;
				if (productLower[i] == searchLower[0]) {
					if (searchLower.length == 1) {
						return true;
					}
					for (let j = 1; j < searchLower.length; j++) {
						if (productLower[currentI] != searchLower[j]) {
							return false;
						}
						currentI++;
					}
					return true;
				} else {
					continue;
				}
			}
		});
		searchData.value = [];
		searchData.value = [...filterData];
	}
});
const rupiah = (number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(number);
};
const discon = (val) => {
	if (val != null) {
		let discon = (val.price * val.discon) / 100;
		return val.price - discon;
	}
};

watch(provincesSelect, () => {
	regenciesSelect.value = "";
	for (let i in address.value) {
		if (address.value[i].name == provincesSelect.value) {
			regencies.value.push(...address.value[i].regencies);
			break;
		}
	}
});
watch(regenciesSelect, () => {
	if (regenciesSelect.value != "") {
		datasLocationValue();
		moreLocationDataFirst();
		moreButtonLocation();
	} else {
		regenciesSelect.value = "";
	}
});

watch(selectedType, () => {
	if (regenciesSelect.value != "") {
		moreButtonLocation();
	} else {
		moreButtonMore();
	}
});

function loadMore() {
	if (regenciesSelect.value == "") {
			for (let i = datas.value.more[selectedType.value].length;	i < datas.value.more[selectedType.value].length + 10;	i++) {
				datas.value[selectedType.value][i] ? datas.value.more[selectedType.value].push(datas.value[selectedType.value][i]) : "";
			}
			datas.value[selectedType.value].length <= datas.value.more[selectedType.value].length	? (moreButton.value = false) : (moreButton.value = true);
	} else {
		for (let i = datas.value.more.location[selectedType.value].length;	i < datas.value.more.location[selectedType.value].length + 10;	i++) {
				datas.value.location[selectedType.value][regenciesSelect.value][i] ? datas.value.more.location[selectedType.value].push(datas.value.location[selectedType.value][regenciesSelect.value][i]) : "";
			}
			datas.value.location[selectedType.value].length <= datas.value.more.location[selectedType.value].length	? (moreButton.value = false) : (moreButton.value = true);
	}
}
function moreButtonLocation() {
	if (datas.value.location[selectedType.value].hasOwnProperty(regenciesSelect.value)) {
		datas.value.location[selectedType.value][regenciesSelect.value].length <= datas.value.more.location[selectedType.value].length
			? (moreButton.value = false)
			: (moreButton.value = true);
	}else{
		moreButton.value = false
	}
}
function moreButtonMore() {
		datas.value[selectedType.value].length <= datas.value.more[selectedType.value].length
			? moreButton.value = false
			: moreButton.value = true;
}
function datasLocationValue() {
	let types = ["all", "food", "item"];
	types.forEach((type) => {
		datas.value.location[type] = [];
		datas.value[type].forEach((val) => {
			if (!datas.value.location[type].hasOwnProperty(val.user.address)) {
				datas.value.location[type][val.user.address] = [];
				datas.value.location[type][val.user.address].push(val);
			} else {
				datas.value.location[type][val.user.address].push(val);
			}
		});
	});
}
function moreLocationDataFirst() {
	let types = ["all", "food", "item"];
	let current = regenciesSelect.value;
	types.forEach((type) => {
		datas.value.more.location[type] = []
		for (let i = datas.value.more.location[type].length; i < 10; i++) {
			if (datas.value.location[type].hasOwnProperty(regenciesSelect.value)) {
				datas.value.location[type][regenciesSelect.value][i]
					? datas.value.more.location[type].push(
							datas.value.location[type][regenciesSelect.value][i],
					  )
					: "";
			}
		}
	});
	
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
<style scoped>
.skeleton {
	background: linear-gradient(0.25turn, transparent, #fff, transparent),
		linear-gradient(#eee, #eee);
	background-repeat: no-repeat;
	background-size: 200px 400px, 315px 400px, 100px 100px, 225px 30px;
	background-position: -315px 0, 0 0, 0px 190px, 50px 195px;
	animation: loading 1.5s infinite;
}
@keyframes loading {
	to {
		background-position: 315px 0, 0 0, 0 190px, 50px 195px;
	}
}
</style>
