<template>
    <div>
        <q-page class="text-center">
            <div class="q-pa-md q-gutter-sm">
                <q-breadcrumbs gutter="xs">
                    <q-breadcrumbs-el label="Home" to="/" />
                    <q-breadcrumbs-el label="Tic Tac Emoji" />
                </q-breadcrumbs>
            </div>

            <h2 class="q-mb-sm">Tic Tac Emoji</h2>
            <h5 class="q-mt-sm">Tic tac toe game</h5>

            <div class="q-gutter-md flex flex-center">
                <q-card>
                    <q-card-section class="text-center">
                        <pre class="text-subtitle1">😝  🖐  ×</pre>
                        <pre class="text-subtitle1">🧠  ×  🐖</pre>
                        <pre class="text-subtitle1">×  🌽  🚴‍♂️</pre>
                        <q-radio
                            v-model="preset"
                            val="random"
                            label="Random Emoji"
                        />
                    </q-card-section>
                </q-card>
                <q-card>
                    <q-card-section class="text-center">
                        <pre class="text-subtitle1">T   I   ×</pre>
                        <pre class="text-subtitle1">T   ×   C</pre>
                        <pre class="text-subtitle1">×   O   E</pre>
                        <q-radio
                            v-model="preset"
                            val="custom"
                            label="Custom Set"
                        />
                    </q-card-section>
                </q-card>
            </div>
            <div class="q-ma-md column flex-center" v-if="preset === 'custom'">
                <p class="text-subtitle1">Here is your playground:</p>
                <div class="row flex-center" style="width: 100%">
                    <q-input
                        type="textarea"
                        v-for="(value, key) in items"
                        :key="key"
                        class="col-4"
                        :class="`input-${key}`"
                        outlined
                        v-model="items[key]"
                        style="width: 33.33%; font-size: 2vmin"
                    >
                        <!-- <template v-slot:append>
                            <q-icon
                                name="add_circle_outline"
                                class="cursor-pointer"
                                @click="
                                    popupTarget = key;
                                    showPopup = true;
                                "
                            >
                            </q-icon>
                        </template> -->
                    </q-input>
                </div>
            </div>
            <q-dialog v-model="showPopup">
                <div class="emoji-popup q-ma-sm">
                    <span
                        class="emoji-popup__item"
                        v-for="item in emoji_filtered"
                        :key="item.codes"
                        @click="
                            items[popupTarget] = item.char;
                            showPopup = false;
                        "
                        >{{ item.char }}</span
                    >
                </div>
            </q-dialog>
            <!-- <q-popup-proxy
        :target="`.input-${popupTarget}`"
        breakpoint="1920"
        v-show="showPopup"
      >
        <div class="emoji-popup q-ma-sm">
          <span
            class="emoji-popup__item"
            v-for="item in emoji_filtered"
            :key="item.codes"
            @click="
              items[popupTarget] = item.char;
              showPopup = false;
            "
            >{{ item.char }}</span
          >
        </div>
      </q-popup-proxy> -->
            <div class="q-ma-md">
                <q-btn color="primary" size="lg" @click="startGame"
                    >Start a new game</q-btn
                >
            </div>
        </q-page>
    </div>
</template>

<script>
import { API } from "aws-amplify";
import emoji_filtered from "@/assets/emoji_filtered";

export default {
    name: "Tictactoe",
    data() {
        return {
            preset: "random",
            items: {
                a: "",
                b: "",
                c: "",
                d: "",
                e: "",
                f: "",
                g: "",
                h: "",
                i: "",
            },
            emoji_filtered: emoji_filtered,
            popupTarget: "",
            showPopup: false,
        };
    },
    methods: {
        async startGame(size) {
            let gameItems = [];

            if (this.preset === "random") {
                gameItems = await API.get("apid678e88e", `/emoji?count=9`);
            } else {
                gameItems = Object.values(this.items);
            }

            gameItems = gameItems.map((item, idx) => ({
                id: idx,
                content: item,
                status: "new",
            }));

            console.log(gameItems);
            await this.$store.actions
                .createGame({
                    ownerID: this.$store.state.userInfo.id,
                    type: "tictactoe",
                    status: "new",
                    size: "3",
                    gameTeams: [
                        {
                            id: 1,
                            name: "Team X",
                        },
                        {
                            id: 2,
                            name: "Team O",
                        },
                    ],
                    gameItems: gameItems,
                    preset: this.preset,
                })
                .then(({ data: { createGame } }) => {
                    console.log("createGame", createGame);
                    this.joinGame(createGame.id);
                });
        },
        joinGame(game_id) {
            if (game_id) {
                this.$router.push(`/tictactoe/${game_id}`);
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.emoji-popup
    background: white
    max-height: 400px
    &__item
        padding: 5px
        font-size: 24px
        cursor: pointer
</style>
