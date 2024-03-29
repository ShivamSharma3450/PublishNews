/* Editor Code */
// declaring editor

// plugin for adding custom button
(function($R) {
    // plugin name is addbutton which can be integrated as a plugin in the redactor editor's instance.
    $R.add('plugin', 'addbutton', {
        // modal code
        modals: {
            'addbutton': '<form action="" id="addButtonForm" name="addButtonForm">' +
                '<div class="form-item">' +
                '<label>## buttonLabel ##</label>' +
                '<input required type="text" id="label" name="cst_btn_label" id="cst_btn_label">' +
                '<span class="input-error"> </span>' +
                '</div>' +
                '<div class="form-item">' +
                '<label>## linkLabel ##</label>' +
                '<input required type="url" id="link" name="cst_btn_link" id="cst_btn_link">' +
                '<span class="input-error"> </span>' +
                '</div>' +
                '<div class="form-item">' +
                '<label>## colorLabel ##</label>' +
                '<select required class="custom-select" name="cst_btn_color" id="cst_btn_color">' +
                '  <option value="btn_## colorOne ##" selected> ## colorOne ## </option>' +
                '  <option value="btn_## colorTwo ##"> ## colorTwo ## </option>' +
                '  <option value="btn_## colorThree ##"> ## colorThree ## </option>' +
                '</select>' +
                '</div>' +
                '</form>'
        },
        translations: {
            en: {
                // plugin title
                "addbutton": "ADD BUTTON",
                // input labels
                "addbutton-label": "Please, type some text",
                "buttonLabel": "Please Add label",
                "linkLabel": "Please Add Link",
                "colorLabel": "Please Select Color",
                "colorOne": "blue",
                "colorTwo": "green",
                "colorThree": "orange"
            }
        },
        init: function(app) {
            // define app
            this.app = app;

            // define services
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.insertion = app.insertion;
        },

        // messages
        onmodal: {
            // on modal open 
            addbutton: {
                opened: function($modal, $form) {
                    $form.getField('cst_btn_label').focus();
                },
                // getting form data on insert
                insert: function($modal, $form) {
                    var addButtonForm = document.forms['addButtonForm'];
                    var labelInp = addButtonForm.querySelector('#label');
                    var linkInp = addButtonForm.querySelector('#link');
                    for (var i = 0; i < addButtonForm.length; i++) {
                        var formText = addButtonForm[i].id;
                        var formItem = document.querySelectorAll('#addButtonForm .form-item')[i];
                        var span = formItem.querySelector('span.input-error');
                        if (addButtonForm[i].value != "") {
                            if (span) {
                                span.innerText = "";
                            }
                        } else {
                            span.innerText = formText + ' cannot be blank ';
                        }
                    }
                    if (labelInp.value != "" && linkInp.value != "") {
                        // storing form data in a variable
                        var formData = $form.getData();
                        // calling _inset function with formdata
                        this._insert(formData);
                    }
                }
            }
        },

        // public
        start: function() {
            // create the button data
            var buttonData = {
                title: this.lang.get('addbutton'),
                api: 'plugin.addbutton.open'
            };
            // create the button
            var $button = this.toolbar.addButton('addbutton', buttonData);
        },
        open: function() {
            // modal options
            var options = {
                title: this.lang.get('addbutton'),
                width: '600px',
                name: 'addbutton',
                handle: 'insert',
                commands: {
                    insert: { title: this.lang.get('insert') },
                    cancel: { title: this.lang.get('cancel') }
                }
            };
            // building modal
            this.app.api('module.modal.build', options);
        },

        // private
        _insert: function(data) {
            // closing modal on insert
            this.app.api('module.modal.close');
            // getting all the values from the input fields of the form
            var button_label = data.cst_btn_label;
            var button_link = data.cst_btn_link;
            var button_color = data.cst_btn_color;

            /* for adding custom button as a text in the editor */

            // creating a required valute variable with the form data variables.
            // var reqVal = '-----button-start{button: {colour: '+ button_color +' , url: '+ button_link +', text: '+ button_label +'} }-----button-end';
            var anchor = document.createElement('a');
            anchor.classList.add(button_color);
            anchor.innerText = button_label;
            anchor.href = button_link;
            anchor.setAttribute('target', '_blank');
            anchor.setAttribute('rel', 'nofollow');
            var output = document.createElement('div');
            var br = document.createElement('br');
            output.classList.add('editor-btn');
            // adding the required value in the output
            output.append(anchor);
            // inserting this in the page
            // options available (start, end, before and after) for node insertion
            this.insertion.insertNode(output, 'end');
            this.insertion.insertNode(br, 'after');
        }
    });
})(Redactor);


$R('.redactor-textarea', {
    imageFigure: false,
    plugins: ['table', 'alignment', 'addbutton', 'nofollow'],
    imageUpload: '/upload/images',
    minHeight: '400px'
});


var emojis = {
    "set1": [{
            "symbol": "smile",
            "image": "https://cdn1.desidime.com/emojis/medium/smile.png"
        },
        {
            "symbol": "smiley",
            "image": "https://cdn0.desidime.com/emojis/medium/smiley.png"
        },
        {
            "symbol": "grinning",
            "image": "https://cdn0.desidime.com/emojis/medium/grinning.png"
        },
        {
            "symbol": "blush",
            "image": "https://cdn3.desidime.com/emojis/medium/blush.png"
        },
        {
            "symbol": "relaxed",
            "image": "https://cdn2.desidime.com/emojis/medium/relaxed.png"
        },
        {
            "symbol": "wink",
            "image": "https://cdn0.desidime.com/emojis/medium/wink.png"
        },
        {
            "symbol": "kissing_heart",
            "image": "https://cdn2.desidime.com/emojis/medium/kissing_heart.png"
        },
        {
            "symbol": "kissing_closed_eyes",
            "image": "https://cdn3.desidime.com/emojis/medium/kissing_closed_eyes.png"
        },
        {
            "symbol": "kissing",
            "image": "https://cdn0.desidime.com/emojis/medium/kissing.png"
        },
        {
            "symbol": "kissing_smiling_eyes",
            "image": "https://cdn1.desidime.com/emojis/medium/kissing_smiling_eyes.png"
        },
        {
            "symbol": "stuck_out_tongue_winking_eye",
            "image": "https://cdn3.desidime.com/emojis/medium/stuck_out_tongue_winking_eye.png"
        },
        {
            "symbol": "stuck_out_tongue_closed_eyes",
            "image": "https://cdn2.desidime.com/emojis/medium/stuck_out_tongue_closed_eyes.png"
        },
        {
            "symbol": "stuck_out_tongue",
            "image": "https://cdn2.desidime.com/emojis/medium/stuck_out_tongue.png"
        },
        {
            "symbol": "flushed",
            "image": "https://cdn2.desidime.com/emojis/medium/flushed.png"
        },
        {
            "symbol": "grin",
            "image": "https://cdn3.desidime.com/emojis/medium/grin.png"
        },
        {
            "symbol": "pensive",
            "image": "https://cdn1.desidime.com/emojis/medium/pensive.png"
        },
        {
            "symbol": "relieved",
            "image": "https://cdn3.desidime.com/emojis/medium/relieved.png"
        },
        {
            "symbol": "unamused",
            "image": "https://cdn2.desidime.com/emojis/medium/unamused.png"
        },
        {
            "symbol": "disappointed",
            "image": "https://cdn0.desidime.com/emojis/medium/disappointed.png"
        },
        {
            "symbol": "persevere",
            "image": "https://cdn3.desidime.com/emojis/medium/persevere.png"
        },
        {
            "symbol": "cry",
            "image": "https://cdn0.desidime.com/emojis/medium/cry.png"
        },
        {
            "symbol": "joy",
            "image": "https://cdn1.desidime.com/emojis/medium/joy.png"
        },
        {
            "symbol": "sob",
            "image": "https://cdn1.desidime.com/emojis/medium/sob.png"
        },
        {
            "symbol": "sleepy",
            "image": "https://cdn1.desidime.com/emojis/medium/sleepy.png"
        },
        {
            "symbol": "disappointed_relieved",
            "image": "https://cdn1.desidime.com/emojis/medium/disappointed_relieved.png"
        },
        {
            "symbol": "cold_sweat",
            "image": "https://cdn2.desidime.com/emojis/medium/cold_sweat.png"
        },
        {
            "symbol": "sweat_smile",
            "image": "https://cdn2.desidime.com/emojis/medium/sweat_smile.png"
        },
        {
            "symbol": "sweat",
            "image": "https://cdn3.desidime.com/emojis/medium/sweat.png"
        },
        {
            "symbol": "weary",
            "image": "https://cdn3.desidime.com/emojis/medium/weary.png"
        },
        {
            "symbol": "tired_face",
            "image": "https://cdn2.desidime.com/emojis/medium/tired_face.png"
        },
        {
            "symbol": "fearful",
            "image": "https://cdn0.desidime.com/emojis/medium/fearful.png"
        },
        {
            "symbol": "scream",
            "image": "https://cdn1.desidime.com/emojis/medium/scream.png"
        },
        {
            "symbol": "angry",
            "image": "https://cdn3.desidime.com/emojis/medium/angry.png"
        },
        {
            "symbol": "rage",
            "image": "https://cdn1.desidime.com/emojis/medium/rage.png"
        },
        {
            "symbol": "triumph",
            "image": "https://cdn0.desidime.com/emojis/medium/triumph.png"
        },
        {
            "symbol": "confounded",
            "image": "https://cdn2.desidime.com/emojis/medium/confounded.png"
        },
        {
            "symbol": "laughing",
            "image": "https://cdn1.desidime.com/emojis/medium/laughing.png"
        },
        {
            "symbol": "yum",
            "image": "https://cdn1.desidime.com/emojis/medium/yum.png"
        },
        {
            "symbol": "mask",
            "image": "https://cdn2.desidime.com/emojis/medium/mask.png"
        },
        {
            "symbol": "sunglasses",
            "image": "https://cdn1.desidime.com/emojis/medium/sunglasses.png"
        },
        {
            "symbol": "sleeping",
            "image": "https://cdn0.desidime.com/emojis/medium/sleeping.png"
        },
        {
            "symbol": "dizzy_face",
            "image": "https://cdn1.desidime.com/emojis/medium/dizzy_face.png"
        },
        {
            "symbol": "worried",
            "image": "https://cdn0.desidime.com/emojis/medium/worried.png"
        },
        {
            "symbol": "frowning",
            "image": "https://cdn0.desidime.com/emojis/medium/frowning.png"
        },
        {
            "symbol": "anguished",
            "image": "https://cdn2.desidime.com/emojis/medium/anguished.png"
        },
        {
            "symbol": "smiling_imp",
            "image": "https://cdn1.desidime.com/emojis/medium/smiling_imp.png"
        },
        {
            "symbol": "imp",
            "image": "https://cdn1.desidime.com/emojis/medium/imp.png"
        },
        {
            "symbol": "open_mouth",
            "image": "https://cdn1.desidime.com/emojis/medium/open_mouth.png"
        },
        {
            "symbol": "grimacing",
            "image": "https://cdn0.desidime.com/emojis/medium/grimacing.png"
        },
        {
            "symbol": "neutral_face",
            "image": "https://cdn0.desidime.com/emojis/medium/neutral_face.png"
        },
        {
            "symbol": "hushed",
            "image": "https://cdn3.desidime.com/emojis/medium/hushed.png"
        },
        {
            "symbol": "confused",
            "image": "https://cdn0.desidime.com/emojis/medium/confused.png"
        },
        {
            "symbol": "no_mouth",
            "image": "https://cdn0.desidime.com/emojis/medium/no_mouth.png"
        },
        {
            "symbol": "innocent",
            "image": "https://cdn0.desidime.com/emojis/medium/innocent.png"
        },
        {
            "symbol": "smirk",
            "image": "https://cdn1.desidime.com/emojis/medium/smirk.png"
        },
        {
            "symbol": "expressionless",
            "image": "https://cdn0.desidime.com/emojis/medium/expressionless.png"
        },
        {
            "symbol": "man_with_gua_pi_mao",
            "image": "https://cdn0.desidime.com/emojis/medium/man_with_gua_pi_mao.png"
        },
        {
            "symbol": "man_with_turban",
            "image": "https://cdn3.desidime.com/emojis/medium/man_with_turban.png"
        },
        {
            "symbol": "cop",
            "image": "https://cdn0.desidime.com/emojis/medium/cop.png"
        },
        {
            "symbol": "construction_worker",
            "image": "https://cdn2.desidime.com/emojis/medium/construction_worker.png"
        },
        {
            "symbol": "baby",
            "image": "https://cdn3.desidime.com/emojis/medium/baby.png"
        },
        {
            "symbol": "boy",
            "image": "https://cdn1.desidime.com/emojis/medium/boy.png"
        },
        {
            "symbol": "girl",
            "image": "https://cdn0.desidime.com/emojis/medium/girl.png"
        },
        {
            "symbol": "man",
            "image": "https://cdn1.desidime.com/emojis/medium/man.png"
        },
        {
            "symbol": "older_man",
            "image": "https://cdn0.desidime.com/emojis/medium/older_man.png"
        },
        {
            "symbol": "older_woman",
            "image": "https://cdn1.desidime.com/emojis/medium/older_woman.png"
        },
        {
            "symbol": "person_with_blond_hair",
            "image": "https://cdn0.desidime.com/emojis/medium/person_with_blond_hair.png"
        },
        {
            "symbol": "angel",
            "image": "https://cdn1.desidime.com/emojis/medium/angel.png"
        },
        {
            "symbol": "princess",
            "image": "https://cdn1.desidime.com/emojis/medium/princess.png"
        },
        {
            "symbol": "smiley_cat",
            "image": "https://cdn0.desidime.com/emojis/medium/smiley_cat.png"
        },
        {
            "symbol": "smile_cat",
            "image": "https://cdn2.desidime.com/emojis/medium/smile_cat.png"
        },
        {
            "symbol": "heart_eyes_cat",
            "image": "https://cdn1.desidime.com/emojis/medium/heart_eyes_cat.png"
        },
        {
            "symbol": "kissing_cat",
            "image": "https://cdn0.desidime.com/emojis/medium/kissing_cat.png"
        },
        {
            "symbol": "smirk_cat",
            "image": "https://cdn3.desidime.com/emojis/medium/smirk_cat.png"
        },
        {
            "symbol": "scream_cat",
            "image": "https://cdn0.desidime.com/emojis/medium/scream_cat.png"
        },
        {
            "symbol": "crying_cat_face",
            "image": "https://cdn3.desidime.com/emojis/medium/crying_cat_face.png"
        },
        {
            "symbol": "joy_cat",
            "image": "https://cdn0.desidime.com/emojis/medium/joy_cat.png"
        },
        {
            "symbol": "pouting_cat",
            "image": "https://cdn0.desidime.com/emojis/medium/pouting_cat.png"
        },
        {
            "symbol": "see_no_evil",
            "image": "https://cdn0.desidime.com/emojis/medium/see_no_evil.png"
        },
        {
            "symbol": "speak_no_evil",
            "image": "https://cdn0.desidime.com/emojis/medium/speak_no_evil.png"
        },
        {
            "symbol": "fire",
            "image": "https://cdn2.desidime.com/emojis/medium/fire.png"
        },
        {
            "symbol": "sweat_drops",
            "image": "https://cdn0.desidime.com/emojis/medium/sweat_drops.png"
        },
        {
            "symbol": "zzz",
            "image": "https://cdn2.desidime.com/emojis/medium/zzz.png"
        },
        {
            "symbol": "plus1",
            "image": "https://cdn3.desidime.com/emojis/medium/plus1.png"
        },
        {
            "symbol": "minus1",
            "image": "https://cdn1.desidime.com/emojis/medium/minus1.png"
        },
        {
            "symbol": "ok_hand",
            "image": "https://cdn1.desidime.com/emojis/medium/ok_hand.png"
        },
        {
            "symbol": "punch",
            "image": "https://cdn2.desidime.com/emojis/medium/punch.png"
        },
        {
            "symbol": "fist",
            "image": "https://cdn3.desidime.com/emojis/medium/fist.png"
        },
        {
            "symbol": "raised_hand",
            "image": "https://cdn2.desidime.com/emojis/medium/raised_hand.png"
        },
        {
            "symbol": "point_up_2",
            "image": "https://cdn2.desidime.com/emojis/medium/point_up_2.png"
        },
        {
            "symbol": "point_down",
            "image": "https://cdn0.desidime.com/emojis/medium/point_down.png"
        },
        {
            "symbol": "point_right",
            "image": "https://cdn3.desidime.com/emojis/medium/point_right.png"
        },
        {
            "symbol": "point_left",
            "image": "https://cdn0.desidime.com/emojis/medium/point_left.png"
        },
        {
            "symbol": "raised_hands",
            "image": "https://cdn3.desidime.com/emojis/medium/raised_hands.png"
        },
        {
            "symbol": "pray",
            "image": "https://cdn2.desidime.com/emojis/medium/pray.png"
        },
        {
            "symbol": "point_up",
            "image": "https://cdn1.desidime.com/emojis/medium/point_up.png"
        },
        {
            "symbol": "muscle",
            "image": "https://cdn2.desidime.com/emojis/medium/muscle.png"
        },
        {
            "symbol": "walking",
            "image": "https://cdn2.desidime.com/emojis/medium/walking.png"
        },
        {
            "symbol": "runner",
            "image": "https://cdn1.desidime.com/emojis/medium/runner.png"
        },
        {
            "symbol": "dancer",
            "image": "https://cdn2.desidime.com/emojis/medium/dancer.png"
        },
        {
            "symbol": "couple",
            "image": "https://cdn1.desidime.com/emojis/medium/couple.png"
        },
        {
            "symbol": "family",
            "image": "https://cdn1.desidime.com/emojis/medium/family.png"
        },
        {
            "symbol": "two_men_holding_hands",
            "image": "https://cdn3.desidime.com/emojis/medium/two_men_holding_hands.png"
        },
        {
            "symbol": "two_women_holding_hands",
            "image": "https://cdn2.desidime.com/emojis/medium/two_women_holding_hands.png"
        },
        {
            "symbol": "couplekiss",
            "image": "https://cdn2.desidime.com/emojis/medium/couplekiss.png"
        },
        {
            "symbol": "couple_with_heart",
            "image": "https://cdn0.desidime.com/emojis/medium/couple_with_heart.png"
        },
        {
            "symbol": "dancers",
            "image": "https://cdn2.desidime.com/emojis/medium/dancers.png"
        },
        {
            "symbol": "ok_woman",
            "image": "https://cdn0.desidime.com/emojis/medium/ok_woman.png"
        },
        {
            "symbol": "no_good",
            "image": "https://cdn0.desidime.com/emojis/medium/no_good.png"
        },
        {
            "symbol": "information_desk_person",
            "image": "https://cdn3.desidime.com/emojis/medium/information_desk_person.png"
        },
        {
            "symbol": "raising_hand",
            "image": "https://cdn0.desidime.com/emojis/medium/raising_hand.png"
        },
        {
            "symbol": "massage",
            "image": "https://cdn0.desidime.com/emojis/medium/massage.png"
        },
        {
            "symbol": "haircut",
            "image": "https://cdn2.desidime.com/emojis/medium/haircut.png"
        },
        {
            "symbol": "bride_with_veil",
            "image": "https://cdn3.desidime.com/emojis/medium/bride_with_veil.png"
        },
        {
            "symbol": "person_with_pouting_face",
            "image": "https://cdn3.desidime.com/emojis/medium/person_with_pouting_face.png"
        },
        {
            "symbol": "person_frowning",
            "image": "https://cdn0.desidime.com/emojis/medium/person_frowning.png"
        },
        {
            "symbol": "bow",
            "image": "https://cdn1.desidime.com/emojis/medium/bow.png"
        },
        {
            "symbol": "crown",
            "image": "https://cdn1.desidime.com/emojis/medium/crown.png"
        },
        {
            "symbol": "womans_hat",
            "image": "https://cdn2.desidime.com/emojis/medium/womans_hat.png"
        },
        {
            "symbol": "shoe",
            "image": "https://cdn0.desidime.com/emojis/medium/shoe.png"
        },
        {
            "symbol": "high_heel",
            "image": "https://cdn0.desidime.com/emojis/medium/high_heel.png"
        },
        {
            "symbol": "boot",
            "image": "https://cdn0.desidime.com/emojis/medium/boot.png"
        },
        {
            "symbol": "shirt",
            "image": "https://cdn1.desidime.com/emojis/medium/shirt.png"
        },
        {
            "symbol": "womans_clothes",
            "image": "https://cdn2.desidime.com/emojis/medium/womans_clothes.png"
        },
        {
            "symbol": "dress",
            "image": "https://cdn0.desidime.com/emojis/medium/dress.png"
        },
        {
            "symbol": "jeans",
            "image": "https://cdn2.desidime.com/emojis/medium/jeans.png"
        },
        {
            "symbol": "lipstick",
            "image": "https://cdn2.desidime.com/emojis/medium/lipstick.png"
        },
        {
            "symbol": "ring",
            "image": "https://cdn2.desidime.com/emojis/medium/ring.png"
        },
        {
            "symbol": "tiger",
            "image": "https://cdn2.desidime.com/emojis/medium/tiger.png"
        },
        {
            "symbol": "monkey_face",
            "image": "https://cdn2.desidime.com/emojis/medium/monkey_face.png"
        },
        {
            "symbol": "dolphin",
            "image": "https://cdn2.desidime.com/emojis/medium/dolphin.png"
        },
        {
            "symbol": "rose",
            "image": "https://cdn1.desidime.com/emojis/medium/rose.png"
        },
        {
            "symbol": "sunflower",
            "image": "https://cdn2.desidime.com/emojis/medium/sunflower.png"
        },
        {
            "symbol": "sun_with_face",
            "image": "https://cdn2.desidime.com/emojis/medium/sun_with_face.png"
        },
        {
            "symbol": "full_moon_with_face",
            "image": "https://cdn3.desidime.com/emojis/medium/full_moon_with_face.png"
        },
        {
            "symbol": "first_quarter_moon",
            "image": "https://cdn1.desidime.com/emojis/medium/first_quarter_moon.png"
        },
        {
            "symbol": "full_moon",
            "image": "https://cdn1.desidime.com/emojis/medium/full_moon.png"
        },
        {
            "symbol": "last_quarter_moon_with_face",
            "image": "https://cdn0.desidime.com/emojis/medium/last_quarter_moon_with_face.png"
        },
        {
            "symbol": "first_quarter_moon_with_face",
            "image": "https://cdn2.desidime.com/emojis/medium/first_quarter_moon_with_face.png"
        },
        {
            "symbol": "sunny",
            "image": "https://cdn0.desidime.com/emojis/medium/sunny.png"
        },
        {
            "symbol": "umbrella",
            "image": "https://cdn3.desidime.com/emojis/medium/umbrella.png"
        },
        {
            "symbol": "fireworks",
            "image": "https://cdn2.desidime.com/emojis/medium/fireworks.png"
        },
        {
            "symbol": "ghost",
            "image": "https://cdn0.desidime.com/emojis/medium/ghost.png"
        }
    ],
    "set2": [{
            "symbol": "santa",
            "image": "https://cdn3.desidime.com/emojis/medium/santa.png"
        },
        {
            "symbol": "gift",
            "image": "https://cdn2.desidime.com/emojis/medium/gift.png"
        },
        {
            "symbol": "tada",
            "image": "https://cdn0.desidime.com/emojis/medium/tada.png"
        },
        {
            "symbol": "confetti_ball",
            "image": "https://cdn1.desidime.com/emojis/medium/confetti_ball.png"
        },
        {
            "symbol": "computer",
            "image": "https://cdn2.desidime.com/emojis/medium/computer.png"
        },
        {
            "symbol": "iphone",
            "image": "https://cdn0.desidime.com/emojis/medium/iphone.png"
        },
        {
            "symbol": "no_bell",
            "image": "https://cdn1.desidime.com/emojis/medium/no_bell.png"
        },
        {
            "symbol": "alarm_clock",
            "image": "https://cdn2.desidime.com/emojis/medium/alarm_clock.png"
        },
        {
            "symbol": "watch",
            "image": "https://cdn1.desidime.com/emojis/medium/watch.png"
        },
        {
            "symbol": "lock",
            "image": "https://cdn1.desidime.com/emojis/medium/lock.png"
        },
        {
            "symbol": "key",
            "image": "https://cdn1.desidime.com/emojis/medium/key.png"
        },
        {
            "symbol": "bulb",
            "image": "https://cdn2.desidime.com/emojis/medium/bulb.png"
        },
        {
            "symbol": "flashlight",
            "image": "https://cdn2.desidime.com/emojis/medium/flashlight.png"
        },
        {
            "symbol": "battery",
            "image": "https://cdn2.desidime.com/emojis/medium/battery.png"
        },
        {
            "symbol": "pill",
            "image": "https://cdn3.desidime.com/emojis/medium/pill.png"
        },
        {
            "symbol": "dollar",
            "image": "https://cdn3.desidime.com/emojis/medium/dollar.png"
        },
        {
            "symbol": "euro",
            "image": "https://cdn2.desidime.com/emojis/medium/euro.png"
        },
        {
            "symbol": "credit_card",
            "image": "https://cdn3.desidime.com/emojis/medium/credit_card.png"
        },
        {
            "symbol": "calling",
            "image": "https://cdn1.desidime.com/emojis/medium/calling.png"
        },
        {
            "symbol": "envelope",
            "image": "https://cdn1.desidime.com/emojis/medium/envelope.png"
        },
        {
            "symbol": "mailbox",
            "image": "https://cdn2.desidime.com/emojis/medium/mailbox.png"
        },
        {
            "symbol": "calendar",
            "image": "https://cdn3.desidime.com/emojis/medium/calendar.png"
        },
        {
            "symbol": "ledger",
            "image": "https://cdn2.desidime.com/emojis/medium/ledger.png"
        },
        {
            "symbol": "books",
            "image": "https://cdn0.desidime.com/emojis/medium/books.png"
        },
        {
            "symbol": "book",
            "image": "https://cdn1.desidime.com/emojis/medium/book.png"
        },
        {
            "symbol": "basketball",
            "image": "https://cdn2.desidime.com/emojis/medium/basketball.png"
        },
        {
            "symbol": "baseball",
            "image": "https://cdn2.desidime.com/emojis/medium/baseball.png"
        },
        {
            "symbol": "bicyclist",
            "image": "https://cdn1.desidime.com/emojis/medium/bicyclist.png"
        },
        {
            "symbol": "trophy",
            "image": "https://cdn3.desidime.com/emojis/medium/trophy.png"
        },
        {
            "symbol": "coffee",
            "image": "https://cdn2.desidime.com/emojis/medium/coffee.png"
        },
        {
            "symbol": "baby_bottle",
            "image": "https://cdn3.desidime.com/emojis/medium/baby_bottle.png"
        },
        {
            "symbol": "beer",
            "image": "https://cdn1.desidime.com/emojis/medium/beer.png"
        },
        {
            "symbol": "beers",
            "image": "https://cdn3.desidime.com/emojis/medium/beers.png"
        },
        {
            "symbol": "wine_glass",
            "image": "https://cdn2.desidime.com/emojis/medium/wine_glass.png"
        },
        {
            "symbol": "pizza",
            "image": "https://cdn3.desidime.com/emojis/medium/pizza.png"
        },
        {
            "symbol": "hamburger",
            "image": "https://cdn2.desidime.com/emojis/medium/hamburger.png"
        },
        {
            "symbol": "fries",
            "image": "https://cdn1.desidime.com/emojis/medium/fries.png"
        },
        {
            "symbol": "ramen",
            "image": "https://cdn3.desidime.com/emojis/medium/ramen.png"
        },
        {
            "symbol": "doughnut",
            "image": "https://cdn1.desidime.com/emojis/medium/doughnut.png"
        },
        {
            "symbol": "ice_cream",
            "image": "https://cdn1.desidime.com/emojis/medium/ice_cream.png"
        },
        {
            "symbol": "birthday",
            "image": "https://cdn2.desidime.com/emojis/medium/birthday.png"
        },
        {
            "symbol": "pineapple",
            "image": "https://cdn1.desidime.com/emojis/medium/pineapple.png"
        },
        {
            "symbol": "hospital",
            "image": "https://cdn2.desidime.com/emojis/medium/hospital.png"
        },
        {
            "symbol": "hotel",
            "image": "https://cdn3.desidime.com/emojis/medium/hotel.png"
        },
        {
            "symbol": "car",
            "image": "https://cdn3.desidime.com/emojis/medium/car.png"
        },
        {
            "symbol": "bike",
            "image": "https://cdn3.desidime.com/emojis/medium/bike.png"
        },
        {
            "symbol": "warning",
            "image": "https://cdn3.desidime.com/emojis/medium/warning.png"
        },
        {
            "symbol": "baggage_claim",
            "image": "https://cdn2.desidime.com/emojis/medium/baggage_claim.png"
        },
        {
            "symbol": "recycle",
            "image": "https://cdn0.desidime.com/emojis/medium/recycle.png"
        },
        {
            "symbol": "copyright",
            "image": "https://cdn1.desidime.com/emojis/medium/copyright.png"
        }
    ]
}

var data = {
    title: 'emoji'
};

// adding emojie button to the toolbar
var button = $R('.redactor-textarea').toolbar.addButton('emojis', data);
// getting button
var emojiBtn = button.nodes[0];
// adding icon to the button
emojiBtn.innerHTML = '<img src="https://cdn1.desidime.com/emojis/medium/smile.png">';
// creating the emoji section dropdown
var emojiSection = document.createElement('div');
// adding it to the emoji section dropdown
emojiSection.id = 'emoji-section';
// creating tab toggler
var tabTogglerSection = document.createElement('div');
// adding tab-toggler class
tabTogglerSection.classList.add('tab-toggler-section');
// adding buttons inside tab toggler
// recent btn
var recentTabBtn = document.createElement('button');
recentTabBtn.id = 'recentTabBtn';
recentTabBtn.classList += 'ico ico-clock';
// element btn
var elementTabBtn = document.createElement('button');
elementTabBtn.id = 'elementTabBtn';
elementTabBtn.classList += 'ico ico-star-full';
// emoji btn
var emojiTabBtn = document.createElement('button');
emojiTabBtn.id = 'emojiTabBtn';
emojiTabBtn.classList += 'ico ico-happy active';
// tab sections
var toggleSection = document.createElement('div');
toggleSection.classList.add('toggle-section');
// tabs
var recentTab = document.createElement('div');
var emojiTab = document.createElement('div');
var elementTab = document.createElement('div');
// adding class
recentTab.classList.add('emoji-recentTab');
elementTab.classList.add('emoji-elementTab');
emojiTab.classList += ('emoji-emojiTab active');
// adding tabs to tab section
toggleSection.appendChild(recentTab);
toggleSection.appendChild(emojiTab);
toggleSection.appendChild(elementTab);
// adding buttons to the tabToggleSection
tabTogglerSection.appendChild(recentTabBtn);
tabTogglerSection.appendChild(emojiTabBtn);
tabTogglerSection.appendChild(elementTabBtn);
// appending it inside the emojiSection
emojiSection.appendChild(tabTogglerSection);
emojiSection.appendChild(toggleSection);
// appending the emojiSection inside the emoji button
emojiBtn.appendChild(emojiSection);

/* ----------- image ---------------- */

// creating an array to store image urls
var imageUrls = [];
/* emojis is a variable inside emoji.js which is basically the object array of the cdn images */
// getting all the image url and pushing it into the empty array
var set = emojis.set1.forEach(function(obj) {
    imageUrls.push(obj.image);
});
// getting the emoji section div which is gonna have the emojies
var emojiTab = document.querySelector('.emoji-emojiTab');
//running a loop for every image
imageUrls.forEach(function(url) {
    // creating the emoji button
    var btn = document.createElement('button');
    // creating the emoji image element
    var img = document.createElement('img');
    // setting the source equal to the image url
    img.src = url;
    // adding class to the img
    img.classList.add('editor-emojiImg');
    // appending it to its parent button
    btn.appendChild(img);
    // appending button in the section
    emojiTab.appendChild(btn);
});

// on click of the button adding emoji in the section
$('#emoji-section .emoji-emojiTab button').click(function() {
    var img = this.querySelector('img');
    $R('.redactor-textarea').insertion.insertNode(img, 'after');
});
// code to hide the emoji dropdown
document.querySelector('a.re-emojis').addEventListener('click', function() {
    var is = $R('.redactor-textarea').editor.isSourceMode();
    // checking to see if the source mode is active or not
    if (!is) {
        // when clicked on the emoji icon hiding all the active dropdown 
        var redactorDropdown = document.querySelector('.redactor-dropdown');
        if (redactorDropdown != undefined && redactorDropdown.classList.contains('open')) {
            redactorDropdown.classList.add('redactor-animate-hide');
        }
        var emojiSection = this.querySelector('#emoji-section');
        (emojiSection.classList.contains('open')) ? emojiSection.classList.remove('open'): emojiSection.classList.add('open');
    }
});

document.addEventListener('mouseup', function(e) {
    var section = $("a.re-emojis");
    if (!section.is(e.target) &&
        section.has(e.target).length === 0) {
        section.find('#emoji-section').removeClass('open');
    }
});


/* code for tab */
var recentTabBtn = document.querySelector('#recentTabBtn');
var emojiTabBtn = document.querySelector('#emojiTabBtn');
var elementTabBtn = document.querySelector('#elementTabBtn');
var recentTab = document.querySelector('.emoji-recentTab');
var emojiTab = document.querySelector('.emoji-emojiTab');
var elementTab = document.querySelector('.emoji-elementTab');
var emojiSection = document.querySelector('#emoji-section');


recentTabBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    elementTabBtn.classList.remove('active');
    emojiTabBtn.classList.remove('active');
    this.classList.add('active');
    emojiTab.classList.remove('active');
    elementTab.classList.remove('active');
    recentTab.classList.add('active');
});

emojiTabBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    elementTabBtn.classList.remove('active');
    recentTabBtn.classList.remove('active');
    this.classList.add('active');
    recentTab.classList.remove('active');
    elementTab.classList.remove('active');
    emojiTab.classList.add('active');
});

elementTabBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    emojiTabBtn.classList.remove('active');
    recentTabBtn.classList.remove('active');
    this.classList.add('active');
    recentTab.classList.remove('active');
    emojiTab.classList.remove('active');
    elementTab.classList.add('active');
});



var data = {
    title: 'LinkButton'
};