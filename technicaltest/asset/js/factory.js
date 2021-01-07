QuodisysApp
    .factory('Authentication', function () {
        var user = null;

        return {
            SetInformation: function (infor) {
                user = {};
                user.test = {};
                user.information = infor;
            },
            SetTestIQ: function (iq) {
                user.IQ = iq;
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
                /*if (window.localStorage)
                    // window.localStorage.setItem('quodisystest' + $token,JSON.stringify(user));
                    window.localStorage.setItem($token,JSON.stringify(user));*/
            },
            GetTest: function (key) {
                return user[key];
            },
            Recovery: function (token) {
                // var recover = window.localStorage.getItem('quodisystest' + token);
                var recover = window.localStorage.getItem(token);
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
                    for (var i = 0; i < 20; i++) {
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
                        if(typeof user.IQ[i] != 'undefined') {
                            str += '<span style="display:block;font-size:14px;padding-left:6px">' + user.IQ[i] + '</span>';
                            ary.push(user.IQ[i]);
                        }
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
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Apply for</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.company + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Position</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + user.information.position + '</td>' +
                                '</tr>' +
                                '<tr>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Testing Language</td>' +
                                '<td style="text-align:left;font-size:14px;padding-left:6px;width:290px">' + language + '</td>' +
                                '</tr>' +
                                '<tr><th colspan="2" style="font-size:16px;padding-top:15px;">Technical Test</th></tr><tr>' +
                                '<td style="position:relative;text-align:left" colspan="2">' +
                                '<p style="float:left;width:33.33%">' + IQ(10) + '</p>' +
                                '<p style="float:left;width:33.33%">' + IQ(20) + '</p><i style="clear:both"></i>' +
                                '</td>' +
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
