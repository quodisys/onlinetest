QuodisysApp
    .factory('Authentication', function () {
        var user = null;

        return {
            SetInformation: function (infor) {
                user = {};
                user.test = {};
                user.information = infor;
            },
            SetTestIQ: function (iq, iq2) {
                user.IQ = iq;
                user.IQ2 = iq2;
            },
            SetTestMI: function (mi) {
                user.MI = mi;
            },
            SetTestHonesty: function (score) {
                user.Honesty = score;
            },
            SetTestAttitude: function (score) {
                user.Attitude = score;
            },
            SetTest: function () {
                if (window.localStorage)
                    // window.localStorage.setItem('quodisystest' + $token,JSON.stringify(user));
                    window.localStorage.setItem($token,JSON.stringify(user));

            },
            GetTest: function (key) {
                return user[key];
            },
            Recovery: function (token) {
                // var recover = window.localStorage.getItem('quodisystest' + token);
                var recover = window.localStorage.getItem( token);
                console.log(recover);
                if(recover !== undefined && recover !== null ){
                    user = JSON.parse(recover) ;
                    console.log()
                }
            },
            GetUser: function () {
                return user;
            },
            CheckIQ: function () {
                    var str = '';
                    var ary=[];
                    for (var i = 0; i < 30; i++) {
                        str +=  user.IQ[i] ;
                        ary.push(user.IQ[i]);
                    }
                    return ary;
                },
            EmailTemplate: function (cb) {
                $score = 0;
                function IQ(number) {
                    var str = '';
                    var ary=[];
                    for (var i = (number - 10); i < number; i++) {
                        str += '<span style="display:block;font-size:14px;padding-left:6px">#'+ (i+1) + " : " + user.IQ2[i] + '</span>';
                        ary.push(user.IQ[i]);
                    }
                    return str;
                }
                function MIPicture() {
                   $html = $('#previewImage .graph').html();
                   console.log($html)
                   return $html;
                }

                if(user.MI === undefined){
                    user.MI = {};
                }

                if (user.information.language == 'vn') {
                    language = 'Vietnamese'
                } else {
                    language = 'English'
                }
                return '<table style="width:500px">' +
                                '<tr>' +
                                '<th colspan="2" style="font-size:16px;">Information</th>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Email</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.email + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Name</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.name + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Date of Birth</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.birthday + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Position</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.position + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Testing Language</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + language + '</td>' +
                                '</tr>' +
                                '<tr><th colspan="2" style="font-size:16px;padding-top:15px;">IQ Test</th></tr><tr>' +
                                '<td style="position:relative;text-align:left" colspan="2">' +
                                '<p style="float:left;width:33.33%">' + IQ(10) + '</p>' +
                                '<p style="float:left;width:33.33%">' + IQ(20) + '</p>' +
                                '<p style="float:left;width:33.33%">' + IQ(30) + '</p><i style="clear:both"></i>' +
                                '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th colspan="2" style="font-size:16px;">Result IQ Test</th>' +
                                '</tr>' +
                                '<tr>' +
                                '<td colspan="2" style="text-align: left;font-size:14px;font-weight:900;padding-left:6px;padding-top:15px;">{score}/30</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th colspan="2" style="font-size:16px;" style="font-size:16px;">MI Test</th>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">LINGUISTIC</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.linguistic + '</td>' +
                                '</tr >' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">LOGIC</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.logic + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">MUSICAL</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.musical + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">BODILY - KINESTHETIC</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.bodily_kinesthetic + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">SPATIAL - VISUAL</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.visual_spatial + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">INTERPERSONAL</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.interpersonal + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">INTRAPERSONAL</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.intrapersonal + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th colspan="2" style="font-size:16px;padding-top:15px;">Honesty Test</th>' +
                                '</tr>' +
                                '<tr>' +
                                '<td colspan="2" style="text-align: left;font-size:14px;font-weight:900;padding-left:6px">' + user.Honesty + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th colspan="2" style="font-size:16px;padding-top:15px;">Attitude Test</th>' +
                                '</tr>' +
                                '<tr>' +
                                '<td colspan="2" style="text-align: left;font-size:14px;font-weight:900;padding-left:6px">' + user.Attitude + '</td>' +
                                '</tr>' +
                                '</table>';
            },
            EmailTemplateNew: function (cb) {
                $score = 0;
                function IQ(number) {
                    var str = '';
                    var ary=[];
                    for (var i = (number - 10); i < number; i++) {
                        str += user.IQ[i];
                        ary.push(user.IQ[i]);
                    }
                    return str;
                }
                function MIPicture() {
                   $html = $('#previewImage .graph').html();
                   console.log($html)
                   return $html;
                }

                if(user.MI === undefined){
                    user.MI = {};
                }
                var language = '';
                if (user.information.language == 'vn') {
                    language = 'Vietnamese'
                } else {
                    language = 'English'
                }

                return '<style>@font-face {font-family: "arialpdf";font-style: normal;font-weight: normal;src: url("../fonts/arial.ttf");}</style>' +
                            '<table style="width:100%; font-family: arialpdf;">' +
                                '<tr>' +
                                '<th colspan="2" style="color:green; text-align:center; font-size:25px;">Test Result</th>' +
                                '</tr>' +
                                '<tr>' +
                                '<th colspan="2" style="text-align:left; font-size:16px;">Information</th>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Email</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.email + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Name</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.name + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Date of Birth</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.birthday + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Position</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.position + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Testing Language</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + language + '</td>' +
                                '</tr>' +
                                '<tr><th colspan="2" style="text-align:left; font-size:16px;padding-top:15px;">IQ Test: {score}/30</th></tr>' +
                                '<tr style="text-align:left" colspan="2"><td colspan="2">'+ IQ(10) +'</td></tr>' +
                                '<tr style="text-align:left" colspan="2"><td colspan="2">'+ IQ(20) +'</td></tr>' +
                                '<tr style="text-align:left" colspan="2"><td colspan="2">'+ IQ(30) +'</td></tr>' +
                                '<tr>' +
                                '<th colspan="2" style="text-align:left; font-size:16px;" style="font-size:16px;">MI Test</th>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">LINGUISTIC</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.linguistic + '</td>' +
                                '</tr >' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">LOGIC</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.logic + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">MUSICAL</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.musical + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">BODILY - KINESTHETIC</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.bodily_kinesthetic + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">SPATIAL - VISUAL</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.visual_spatial + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">INTERPERSONAL</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.interpersonal + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">INTRAPERSONAL</td>' +
                                '<td style="font-size:14px;padding-left:6px;width:333px;font-weight:900;">' + user.MI.intrapersonal + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<th colspan="2" style="text-align:left; font-size:16px;padding-top:15px;">Honesty Test '+ user.Honesty +' </th>' +
                                '</tr>' +
                                '<tr>' +
                                '<th colspan="2" style="text-align:left; font-size:16px;padding-top:15px;">Attitude Test '+ user.Attitude +'</th>' +
                                '</tr>' +
                                '</table>';
            },
            IsAuthentication: function () {
                if (user === null || user === undefined) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    })
