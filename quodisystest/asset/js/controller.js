QuodisysApp
    .controller('InformationController', ['$rootScope', '$scope', '$location', 'Authentication', function ($rootScope, $scope, $location, Authentication) {
        $scope.Tester = {
            email: "",
            name: "",
            birthday: "",
            position: "",
            password: "",
            company: "",
            language: ""
        }
        $rootScope.Tester ={
            language: "",
            birthday: "",
        };

        $scope.invalid = {};
        $scope.isprocessing = false;
        // http get request to read CSV file content

        $scope.nextstep = function () {
            $scope.isprocessing = true;
            $scope.invalid = {};
            $scope.invalid.message = '';
            var flagValid = true;
            if ($scope.Tester.email.trim() === "") {
                $scope.invalid.email = true;
                flagValid = false;
            }
            if ($scope.Tester.name.trim() === "") {
                $scope.invalid.name = true;
                flagValid = false;
            }
            if ($scope.Tester.birthday.trim() === "") {
                $scope.invalid.birthday = true;
                flagValid = false;
            } else {
                var text = $scope.Tester.birthday.trim();
                var comp = text.split('/');
                if(!isNaN(comp[0]) && !isNaN(comp[1]) && !isNaN(comp[2])) {
                    var d = parseInt(comp[0], 10);
                    var m = parseInt(comp[1], 10);
                    var y = parseInt(comp[2], 10);
                    var date = new Date(y,m-1,d);
                    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                    } else {
                      $scope.invalid.birthday = true;
                    }
                } else {
                    $scope.invalid.birthday = true
                }
            }
            $rootScope.Tester.birthday = $scope.Tester.birthday.trim();

            if ($scope.Tester.position.trim() === "") {
                $scope.invalid.position = true;
                flagValid = false;
            }

            if ($scope.Tester.password.trim() === "") {
                $scope.invalid.password = true;
                flagValid = false;
            }
            if ($scope.Tester.language.trim() === "") {
                $scope.invalid.language = true;
                flagValid = false;
            }
            $rootScope.Tester.language = $scope.Tester.language.trim();
            if (flagValid === false) {
                $scope.isprocessing = false;
                return;
            }
            $.ajax({
                type: "POST",
                //url: '/qds_testing_qds/quodisystest/csvcheckuser.php',
				url: 'csvcheckuser.php',
                data: {
                    email: $scope.Tester.email.trim(),
                    password: $scope.Tester.password.trim()
                },
                dataType: "text",
                success: function (data) {
					console.log(data);
                    if(data === 'false'){
                        $scope.invalid.password = true;
                        $scope.invalid.email = true;
                        $scope.invalid.message= 'Wrong email or password';
                    } else if (data === 'password_used') {
                        $scope.invalid.password = true;
                        $scope.invalid.message = 'Password can only use once.';
                    } else if (data === 'expired') {
                        $scope.invalid.password = true;
                        $scope.invalid.email = true;
                        $scope.invalid.message = 'Account is expired.';
                    } else {
                        /*data = JSON.parse(data);
                        $scope.Tester.company = data.company;
                        sessionStorage.setItem("company",data);*/
						Authentication.SetInformation($scope.Tester);
                        $location.url('/IQ');
                    };
                    $scope.isprocessing = false;
                    $scope.$apply();
                },
                error: function (data) {
                    $scope.isprocessing = false;
                },
            });
        }
    }]).controller('IQController', ['$rootScope', '$scope', '$interval', '$location', 'Authentication', function ($rootScope, $scope, $interval, $location, Authentication) {
        var checkIQ = Authentication.GetTest('IQ');
        if (checkIQ !== undefined
            && checkIQ !== null) {
            $location.url('/MI');
        }
        //init
        $scope.timer = {
            countDown: 2699, //2699
            time: function () {
                if ($scope.timer.countDown < 60) {
                    return $scope.timer.countDown;
                } else {
                    var minutes = Math.floor($scope.timer.countDown / 60);
                    var seconds = $scope.timer.countDown % 60;
                    return minutes + ":" + seconds;
                }
            }
        }
        var ivt = $interval(function () {
            if ($scope.timer.countDown > 0) {
                $scope.timer.countDown--;
            } else {
                $scope.result();
            }
        }, 1000);

        $scope.questions = [];
        $scope.currentQuestion = {
            number: 1,
            index: function () {
                return $scope.currentQuestion.number - 1;
            },

            path: function () {
                return $rootScope.globalConfig.rootTemplate + "IQ/question_" + $scope.currentQuestion.number + ".html";
            }
        };
        var Question = function (number) {
            var _ = this;
            _.questionNumber = number;
            _.questionAnswer = null;
        }
        Question.prototype.result = function () {
            var _ = this;
            if (_.questionAnswer === null) {
                return " ---n/a--- ";
            }

            switch (typeof _.questionAnswer) {
                case "string":
                    return _.questionAnswer;
                case "object":
                    var ps = Object.getOwnPropertyNames(_.questionAnswer);
                    var arr = [];
                    ps.forEach(function (p, i) {
                        if (_.questionAnswer[p] !== false) {
                            arr.push(_.questionAnswer[p]);
                        }
                    });
                    if (arr.length == 0)
                        return " ---n/a--- ";
                    else
                        return arr.join(" , ");
                default:
                    return " ---n/a--- ";
            }
        }
        var initQuestions = function () {
            var arr = [];
            for (var i = 1; i < 31; i++) {
                arr.push(new Question(i));
            };
            return arr;
        };
        $scope.questions = initQuestions();

        //function
        $scope.nextQuestion = function () {

            if ($scope.currentQuestion.number < 31) {
                $scope.currentQuestion.number++;
            }

        }
        $scope.prevQuestion = function () {
            if ($scope.currentQuestion.number > 1) {
                $scope.currentQuestion.number--;
            }
        }
        $scope.checkboxMapping = function ($event, value) {
            var checkbox = $event.target;

            if ($scope.questions[$scope.currentQuestion.index()].questionAnswer === null) {
                $scope.questions[$scope.currentQuestion.index()].questionAnswer = [];
            }

            if (checkbox.checked) {
                $scope.questions[$scope.currentQuestion.index()].questionAnswer.push(value);
            } else {
                var idx = $scope.questions[$scope.currentQuestion.index()].questionAnswer.indexOf(value);
                if (idx > -1) {
                    $scope.questions[$scope.currentQuestion.index()].questionAnswer.splice(idx, 1);
                }
            }
        }
        $scope.result = function () {
            $interval.cancel(ivt);
            var arr = [];
            var arr2 = [];
            $scope.questions.forEach(function (question, indx) {
                arr.push(" #" + (indx + 1) + " : " + question.result())
                arr2.push(question.result())
            });
            Authentication.SetTestIQ(arr, arr2);
            Authentication.SetTest("IQ");
            $location.path("/MI");
        }
    }]).controller('MIController', ['$rootScope', '$scope', '$location', 'Authentication', function ($rootScope, $scope, $location, Authentication) {
        var checkIQ = Authentication.GetTest('MI');
        var questions = [];
        var language = Authentication.GetUser().information.language;
        if (checkIQ !== undefined
            && checkIQ !== null) {
            $location.url('/Honesty');
        }
        if(language == 'vn') {
            $scope.language = 'vn';
            questions = [
                'Tôi muốn học thêm nhiều về bản thân mình',
                'Tôi có thể chơi 1 loại nhạc cụ',
                'Tôi thấy cách dễ dàng nhất để xử lý 1 vấn đề khi tôi đang làm gì đó bằng tay chân',
                'Trong đầu tôi hay có một vài câu hát nào đó',
                'Tôi luôn thấy dễ dàng quản lý chi tiêu của mình',
                'Tôi có thể dễ dàng nghĩ ra 1 câu chuyện',
                'Tôi luôn hợp tác và phối hợp với mọi người',
                'Khi nói chuyện với ai đó, tôi thường để ý từ ngữ mà họ dùng chứ không phải chỉ có ý họ nói',
                'Tôi thích chơi ô chữ, tìm chữ',
                'Tôi không thích sự mập mờ, thích mọi thứ phải rõ ràng',
                'Tôi thích trò chơi logic, như "sudoku"',
                'Tôi thích ngồi thiền',
                'Âm nhạc rất quan trọng với tôi',
                'Tôi có thể nói dối một cách thuyết phục',
                'Tôi chơi thể thao, khiêu vũ',
                'Tôi thích các bài trắc nghiệm bản thân, cá tính và trí thông minh',
                'Cách hành xử vô lý của mọi người làm tôi khó chịu',
                'Loại âm nhạc tôi thích nghe tùy theo tâm trạng lúc đó',
                'Tôi là người hoạt bát sôi nổi và thích ở chỗ đông người',
                'Tôi thích làm việc có hệ thống và trình tự',
                'Tôi có thể dễ dàng đọc biểu đồ, đồ thị',
                'Tôi có thể chơi các trò chơi ném đồ vật (Mũi tên, Frisbees, bắn bi)',
                'Tôi có thể dễ dàng nhớ ngạn ngữ, tục ngữ',
                'Tôi có thể nhận ra nơi tôi đã từng đến dù lúc tôi đến tôi còn rất nhỏ',
                'Tôi thích nhiều loại âm nhạc',
                'Khi tập trung tôi hay vẽ, phác ra các hình dạng không cụ thể',
                'Tôi có thể lôi kéo, điều khiển người khác nếu tôi muốn',
                'Tôi có thể tự đoán trước cảm giác và cách hành xử của mình trong các trường hợp cụ thể',
                'Tôi có thể tính nhẩm trong đầu',
                'Tôi có thể nhận biết âm thanh mà không cần nhìn vật đã phát ra âm thanh đó',
                'Ở trường 1 trong những môn học yêu thích là Tiếng Việt',
                'Tôi thích suy nghĩ cẩn thận một vấn đề bao gồm cả các hệ lụy nó có thể gây ra',
                'Tôi thích tranh luận, bàn luận',
                'Tôi thích các trò chơi cảm giác mạnh',
                'Tôi thích nhất các môn thể thao cá nhân',
                'Tôi quan tâm đến cảm xúc của người xung quanh',
                'Nhà tôi luôn đầy tranh ảnh, hình ảnh',
                'Tôi rất thích tạo ra đồ vật bằng tay, vì tôi khéo tay',
                'Tôi luôn muốn có nhạc nền, ở bất cứ đâu',
                'Tôi có thể dễ dàng nhớ số điện thoại ai đó',
                'Tôi luôn đặt mục tiêu và lên kế hoạch cho tương lai',
                'Tôi là người rất chính xác',
                'Tôi có thể nhận biết ngay ai thích tôi, hoặc ghét tôi',
                'Tôi có thể dễ dàng tưởng tượng ra mọi chuyện thế nào ở nhiều khía cạnh khác nhau',
                'Tôi không bao giờ đọc hướng dẫn khi lắp ghép đồ gỗ',
                'Tôi có thể dễ dàng nói chuyện với người lạ',
                'Để học 1 cái gì mới, tôi chỉ cần thử làm ngay là được',
                'Tôi vẫn thường nhìn thấy hình ảnh rõ nét khi nhắm mắt',
                'Tôi không dùng ngón tay khi đếm',
                'Tôi thường tự nói chuyện với mình, nói to ra hay là tự nói trong đầu',
                'Ở trường, tôi luôn thích các tiết học âm nhạc',
                'Khi ở nước ngoài, tôi thường nắm bắt ngôn ngữ của họ 1 cách nhanh chóng',
                'Tôi thấy các trò chơi bóng rất vui và thư giãn',
                'Bộ môn yêu thích của tôi ở trường là Toán',
                'Tôi luôn biết mình cảm thấy thế nào',
                'Tôi rất thực tế về các điểm mạnh và yếu của mình',
                'Tôi luôn có nhật ký',
                'Tôi luôn để ý ngôn ngữ thân thể, cử chỉ của mọi người',
                'Bộ môn yêu thích của tôi là hội họa',
                'Tôi thích đọc sách và đọc nhiều',
                'Tôi có thể đọc bản đồ dễ dàng',
                'Tôi rất bực nếu nhìn thấy ai khóc mà không giúp gì được',
                'Tôi giỏi dàn hòa trong các cuộc tranh cãi',
                'Tôi luôn mơ thành nhạc sĩ hoặc ca sĩ',
                'Tôi thích thể thao đồng đội',
                'Hát làm tôi cảm thấy vui',
                'Tôi chưa bao giờ bị lạc khi ở 1 mình ở 1 nơi mới',
                'Để học cách làm 1 cái gì đó, tôi thích nhìn hình vẽ, bản đồ hướng dẫn',
                'Tôi thích dành thời gian ở 1 mình',
                'Bạn tôi luôn tìm lời khuyên ở tôi khi họ có vấn đề về tình cảm'
            ];
            $scope.questions = [];
            questions.forEach(function (a) {
                $scope.questions.push({
                    question: a,
                    answer: 0
                });
            });
       } else {
            $scope.language = 'en';
            questions = [
                'I like to learn more about myself',
                'I can play a musical instrument',
                'I find it easiest to solve problems when I am doing something physical',
                'I often have a song or piece of music in my head',
                'I find budgeting and managing my money easy',
                'I find it easy to make up stories ',
                'I have always been very coordinated',
                'When talking to someone, I tend to listen to the words they use not just what they mean',
                'I enjoy cross words, word searches or other word puzzles',
                'I don’t like ambiguity, I like things to be clear',
                'I enjoy logic puzzles such as "Sudoku"',
                'I like to meditate',
                'Music is very important to me',
                'I am a convincing liar ',
                'I play a sport or dance',
                'I am very interested in psychometrics (personality testing) and IQ tests',
                'People behaving irrationally annoy me',
                'I find that the music that appeals to me is often based on how I feel emotionally',
                'I am a very social person and like being with other people',
                'I like to be systematic and thorough',
                'I find graphs and charts easy to understand',
                'I can throw things well - darts, skimming pebbles, Frisbees, etc. ',
                'I find it easy to remember quotes or phrases ',
                'I can always recognize places that I have been before, even when I was very young',
                'I enjoy a wide variety of musical styles',
                'When I am concentrating I tend to doodle',
                'I could manipulate people if I choose to',
                'I can predict my feelings and behaviors in certain situations fairly accurately',
                'I find mental arithmetic easy ',
                'I can identify most sounds without seeing what causes them',
                'At school one of my favorite subjects is / was English ',
                'I like to think through a problem carefully, considering all the consequences',
                'I enjoy debates and discussions',
                'I love adrenaline sports and scary rides',
                'I enjoy individual sports best',
                'I care about how those around me feel',
                'My house is full of pictures and photographs',
                'I enjoy and am good at making things - I am good with my hands',
                'I like having music on in the background',
                'I find it easy to remember telephone numbers',
                'I set myself goals and plans for the future',
                'I am a very tactile person',
                'I can tell easily whether someone likes me or dislikes me',
                'I can easily imagine how an object would look from another perspective',
                'I never use instructions for flat-pack furniture',
                'I find it easy to talk to new people',
                'To learn something new, I need to just get on and try it',
                'I often see clear images when I close my eyes',
                'I don’t use my fingers when I count',
                'I often talk to myself – out loud or in my head',
                'At school I loved / love music lessons',
                'When I am abroad, I find it easy to pick up the basics of another language',
                'I find ball games easy and enjoyable',
                'My favorite subject at school is / was math',
                'I always know how I am feeling',
                'I am realistic about my strengths and weaknesses',
                'I keep a diary',
                'I am very aware of other people’s body language',
                'My favorite subject at school was / is art',
                'I find pleasure in reading ',
                'I can read a map easily',
                'It upsets me to see someone cry and not be able to help',
                'I am good at solving disputes between others',
                'I have always dreamed of being a musician or singer',
                'I prefer team sports',
                'Singing makes me feel happy',
                'I never get lost when I am on my own in a new place',
                'If I am learning how to do something, I like to see drawings and diagrams of how it works',
                'I am happy spending time alone',
                'My friends always come to me for emotional support and advice'
            ];
            $scope.questions = [];
            questions.forEach(function (a) {
                $scope.questions.push({
                    question: a,
                    answer: 0
                });
            });
        }
        $scope.MIView = {
            idx: 0,
            views: function () {
                switch ($scope.MIView.idx) {
                    case 1:
                        // return $rootScope.globalConfig.rootTemplate + "Attitude/MIResult.html";
                    default:
                        return $rootScope.globalConfig.rootTemplate + "Attitude/MITest.html";
                }
            }
        }

        $scope.chart = {
            Language: function (maxHeight) {
                var rate = $scope.calculator.Language() / 40;
                return maxHeight * rate;
            },
            LogicAndMath: function (maxHeight) {
                var rate = $scope.calculator.LogicAndMath() / 40;
                return maxHeight * rate;
            },
            Music: function (maxHeight) {
                var rate = $scope.calculator.Music() / 40;
                return maxHeight * rate;
            },
            Sport: function (maxHeight) {
                var rate = $scope.calculator.Sport() / 40;
                return maxHeight * rate;
            },
            SpaceAndImage: function (maxHeight) {
                var rate = $scope.calculator.SpaceAndImage() / 40;
                return maxHeight * rate;
            },
            Communication: function (maxHeight) {
                var rate = $scope.calculator.Communication() / 40;
                return maxHeight * rate;
            },
            Introspective: function (maxHeight) {
                var rate = $scope.calculator.Introspective() / 40;
                return maxHeight * rate;
            }
        }
        $scope.calculator = {
            Language: function () {
                return $scope.questions[5].answer
                    + $scope.questions[7].answer
                    + $scope.questions[8].answer
                    + $scope.questions[13].answer
                    + $scope.questions[22].answer
                    + $scope.questions[30].answer
                    + $scope.questions[32].answer
                    + $scope.questions[49].answer
                    + $scope.questions[51].answer
                    + $scope.questions[59].answer;
            },
            LogicAndMath: function () {
                return $scope.questions[4].answer
                    + $scope.questions[9].answer
                    + $scope.questions[10].answer
                    + $scope.questions[16].answer
                    + $scope.questions[19].answer
                    + $scope.questions[28].answer
                    + $scope.questions[31].answer
                    + $scope.questions[39].answer
                    + $scope.questions[48].answer
                    + $scope.questions[53].answer;
            },
            Music: function () {
                return $scope.questions[1].answer
                    + $scope.questions[3].answer
                    + $scope.questions[12].answer
                    + $scope.questions[17].answer
                    + $scope.questions[24].answer
                    + $scope.questions[29].answer
                    + $scope.questions[38].answer
                    + $scope.questions[50].answer
                    + $scope.questions[63].answer
                    + $scope.questions[65].answer;
            },
            Sport: function () {
                return $scope.questions[2].answer
                    + $scope.questions[6].answer
                    + $scope.questions[14].answer
                    + $scope.questions[21].answer
                    + $scope.questions[33].answer
                    + $scope.questions[37].answer
                    + $scope.questions[41].answer
                    + $scope.questions[44].answer
                    + $scope.questions[46].answer
                    + $scope.questions[52].answer;
            },
            SpaceAndImage: function () {
                return $scope.questions[20].answer
                    + $scope.questions[23].answer
                    + $scope.questions[25].answer
                    + $scope.questions[36].answer
                    + $scope.questions[43].answer
                    + $scope.questions[47].answer
                    + $scope.questions[58].answer
                    + $scope.questions[60].answer
                    + $scope.questions[66].answer
                    + $scope.questions[67].answer;
            },
            Communication: function () {
                return $scope.questions[18].answer
                    + $scope.questions[26].answer
                    + $scope.questions[35].answer
                    + $scope.questions[42].answer
                    + $scope.questions[45].answer
                    + $scope.questions[57].answer
                    + $scope.questions[61].answer
                    + $scope.questions[62].answer
                    + $scope.questions[64].answer
                    + $scope.questions[69].answer;
            },
            Introspective: function () {
                return $scope.questions[0].answer
                    + $scope.questions[11].answer
                    + $scope.questions[15].answer
                    + $scope.questions[27].answer
                    + $scope.questions[34].answer
                    + $scope.questions[40].answer
                    + $scope.questions[54].answer
                    + $scope.questions[55].answer
                    + $scope.questions[56].answer
                    + $scope.questions[68].answer;
            }
        }

        $scope.result = function () {
            $scope.MIView.idx = 1;

            Authentication.SetTestMI({
                linguistic: $scope.calculator.Language(),
                logic: $scope.calculator.LogicAndMath(),
                musical: $scope.calculator.Music(),
                bodily_kinesthetic: $scope.calculator.Sport(),
                visual_spatial: $scope.calculator.SpaceAndImage(),
                interpersonal: $scope.calculator.Communication(),
                intrapersonal: $scope.calculator.Introspective(),
            });
            Authentication.SetTest();
        }

    }]).controller('HonestyController', ['$rootScope', '$scope', '$location', 'Authentication', function ($rootScope, $scope, $location, Authentication) {
        var checkIQ = Authentication.GetTest('Honesty');
        var questions = [];
        var language = Authentication.GetUser().information.language;
        if (checkIQ !== undefined
            && checkIQ !== null) {
            $location.url('/Attitude');
        }
        if(language == 'vn') {
            $scope.language = 'vn';
            questions = [
                'Nếu một phóng viên cố tình để ví tiền trong đó có ID, thẻ tín dụng và 200 USD tiền mặt bên vệ đường để xem người nhặt được có đem trả lại hay không, thì thông thường đa số người nhặt được của rơi sẽ đem trả lại.',
                'Rất ít người lấy những thứ không thuộc sở hữu của họ vì họ biết có những giới hạn không nên vượt qua.',
                'Bạn có thể tin tưởng hầu như tất cả mọi người.',
                'Hầu hết kẻ trộm trong siêu thị là trẻ em.',
                'Nếu trẻ con ăn cắp nữ trang, tiền bạc, vật dụng quý ở nhà của bạn thì phải bị bắt đem trả lại, xin lỗi chủ nhà, làm việc phục vụ công đồng và mua lại cho người bạn đó một món quà tương tự.',
                'Tôi không quen ai ở tuối vị thành niên hoặc trẻ em mà có tật ăn cắp vặt.',
                'Việc thưởng cho trẻ em thành thật là rất quan trọng mà các giáo viên và bậc cha mẹ nên làm.',
                'Hầu hết các bậc cha mẹ đều cho rằng trẻ ăn cắp vặt những thứ mà họ không thể mua được là chuyện bình thường.',
                'Nếu ai đó nói với tôi họ chưa bao giờ ăn cắp vặt, tôi hoàn toàn tin họ.',
                'Pháp luật trừng trị các hành vi trộm cắp còn quá khoan dung.',
                'Các hành vi trộm cắp nên bị phạt tù lâu năm.',
                'Mua lại các hàng hoá bị đánh cắp thì không sao nếu có thể mua ở các tiệm đồ second-hand.',
                'Tất cả những người tôi biết đều rất thật thà.',
                'Nếu bạn bị trả lương thiếu, thì cũng không cần thiết phải phàn nàn với cấp trên.',
                'Việc đem dụng cụ văn phòng về nhà là bình thường vì bạn đã bị trả lương quá thấp so với giá trị của bạn',
                'Ai cũng lấy bút chì và bút bi từ sếp.',
                'Khi không còn gì để làm thì về nhà sớm trước giờ tan sở là bình thường.',
                'Xin nghỉ ốm khi mình không ốm mà chỉ muốn nghỉ ở nhà đi xem phim thư giãn thì cũng được mà.',
                'Ai cũng lấy một thứ gì đó ở công sở như thời gian, ngày nghỉ phép, hoặc văn phòng phẩm.',
                'Tôi đồng ý với việc người nhặt được của rơi hoàn toàn có quyền giữ lại vật đó.',
                'Nếu kế toán chuyển lương cho tôi nhiều hơn so với mức lương, tôi giữ im lặng. Sếp không cần biết việc này.',
                'Xin nghỉ ốm 1 tuần để đi trăng mật là bình thường.',
                'Nếu tôi nhìn thấy giám sát của mình ăn cắp tôi sẽ nói với các đồng nghiệp khác',
                'Nếu 1 đồng nghiệp sử dụng thuốc kích thích khi làm việc, việc đó phải được báo cho sếp cho dù việc đó có thể làm anh ta mất việc.',
                'Những người lấy thức ăn chó ở các tiệm giảm giá mà không hỏi ý kiến chủ tiệm không hẳn là đang ăn cắp nếu thức ăn đó được đem cho những chú chó sở hữu bởi những người già không có khả năng đi mua đồ ăn cho nó.',
            ];
            $scope.questions = [];
            questions.forEach(function (a) {
                $scope.questions.push({
                    question: a,
                    answer: 0
                });
            });
        } else {
            $scope.language = 'en';
            questions = [
                'If a wallet with identification, credit cards, and $200 in cash is purposely left on the sidewalk by a newspaper reporter to see whether it will be returned as found with the cash and credit cards, most people would be honest enough to immediately return the wallet to its owner.',
                'Very few people ever have taken anything that didn’t belong to them because they understand there are boundaries of ownership that are not to be crossed for any reason.',
                'You can trust the majority of people.',
                'Most shoplifters are children.',
                'Children who take money or jewelry from a friend’s house should be made to apologize, return the item, earn money doing chores or community service, and buy that friend a similar gift.',
                'No one I knew as a child or adolescent shoplifted.',
                'It’s very important that parents and teachers reward children for being honest.',
                'Most parents think that it’s normal for children to steal small toys that the parents cannot afford.',
                'If someone says he or she has never stolen or shoplifted, I naturally believe the person.',
                'Shoplifting laws are too lenient.',
                'Shoplifters should be punished with long-term jail time.',
                'It’s okay to buy stolen merchandise if you can get it cheap at a thrift store.',
                'Everyone I know is honest.',
                'If you’re undercharged, it’s okay to not bring it to the attention of the management.',
                'If you take office supplies home, it’s okay because you’re probably underpaid.',
                'Everybody steals pencils and pens from the boss.',
                'It’s acceptable to steal time by leaving the office early when there’s no work to do.',
                'It’s proper to call in sick when you’re healthy and just want to go to a movie or the beach.',
                'Everybody steals something at work—time, days off, or office supplies.',
                'I strongly agree that finders are keepers of anything found in public places.',
                'If my boss sends me a paycheck with more money than I earned, I’ll keep it without bringing the error to my boss’s attention.',
                'It’s okay to take a week off from work for my honeymoon by calling in sick.',
                'If I see my supervisor stealing, I’ll tell my co-workers, but not inform the company headquarters in another city.',
                'If a co-worker uses illegal drugs on the job, it’s right to report it to the boss, even though I’ll probably be sabotaged by my co-workers for snitching.',
                'Employees who take home dog food without permission from discount stores are not really stealing if they donate the pet food to feed dogs owned by elderly shut-ins who are delivered hot meals.'
            ];
            $scope.questions = [];
            questions.forEach(function (a) {
                $scope.questions.push({
                    question: a,
                    answer: 0
                });
            });
        }

        $scope.HonestyView = {
            idx: 0,
            views: function () {
                switch ($scope.HonestyView.idx) {
                    case 1:
                        return $rootScope.globalConfig.rootTemplate + "Attitude/HonestyResult.html";
                    default:
                        return $rootScope.globalConfig.rootTemplate + "Attitude/HonestyTest.html";
                }
            }
        }

        $scope.result = function () {
            $scope.HonestyView.idx = 1;
            Authentication.SetTestHonesty($scope.score());
            Authentication.SetTest();
        }

        $scope.score = function () {
            var score = 0;
            $scope.questions.forEach(function (q) {
                score += q.answer
            });

            return score;
        }

    }]).controller('AttitudeController', ['$rootScope', '$scope', '$location', 'Authentication', function ($rootScope, $scope, $location, Authentication) {
        var checkIQ = Authentication.GetTest('Attitude');
        var questions = [];
        var language = Authentication.GetUser().information.language;
        if (checkIQ !== undefined
            && checkIQ !== null) {
            $location.url('/Finish');
        }
        if(language == 'vn') {
            $scope.language = 'vn';
            questions = [
                'Tôi tự hào về quê hương của mình.',
                'Tôi sẽ thông báo với chủ cửa hàng nếu thấy có mặt hàng trên kệ hết hạn sử dụng.',
                'Cha mẹ nên dạy con cái phân biệt rõ ràng đúng và sai từ khi còn rất nhỏ.',
                'Con người về căn bản là tốt “Nhân chi sơ, tính bản thiện”.',
                'Tôi luôn luôn hướng tới tương lai và lập kế hoạch cho bản thân.',
                'Tôi cố gắng không phân biệt đối xử với mọi người cho dù họ là ai đi nữa.',
                'Khi càng hiểu biết hơn về thế giới và con người thì trái đất sẽ trở nên an toàn hơn.',
                'Tôi rất lo lắng về tỷ lệ tội phạm trong xã hội ngày nay.',
                'Tôi luôn tin tưởng quy tắc căn bản “khách hàng là thượng đế”.',
                'Có ít người tôi biết mà tôi không tin tưởng họ.',
                'Tôi dễ tha thứ.',
                'Tôi luôn thẳng thắn với mọi người về bản thân và niềm tin của mình.',
                'Tôi tập trung toàn bộ năng lượng để làm tốt nhất những gì tôi đang làm.',
                'Tôi rất thích khi mọi người yêu thích và tôn trọng mình.',
                'Tôi giận dữ khi mọi người trở nên rập khuôn theo 1 hình mẫu nào đó.',
                'Tôi luôn cố gắng hiểu quan điểm của người khác.',
                'Tôi không có xu hướng than phiền nhiều.',
                'Tôi sẵn sàng chiều ý người khác.',
                'Tôi thấy cử chỉ đi, đứng bỏ tay vào túi quần là kỳ cục.',
                'Tôi thấy hồi hộp khi tìm hiểu về niềm tin của người khác.',
                'Tôi luôn cố gắng giữ cho cơ thể khỏe mạnh.',
                'Nhìn chung, chúng ta tạo ra vận may cho chính mình.',
                'Tôi cười nhiều hơn những người tôi quen.',
                'Tôi chăm sóc nhà cửa, vườn tược ngăn nắp sạch sẽ.',
                'Khi mới gặp người lạ tôi luôn cố gắng không đánh giá tư cách họ qua vẻ bề ngoài.'
            ];
            $scope.questions = [];
            questions.forEach(function (a) {
                $scope.questions.push({
                    question: a,
                    answer: 0
                });
            });
        } else {
            $scope.language = 'en';
            questions = [
                'I am proud of my nationality',
                'I would tell a shopkeeper if I noticed his=her shop was selling food beyond its sell-by date',
                'Parents should teach their children the difference between right and wrong from a very early age',
                'People are basically decent',
                'I continually look forward to, and plan for, the future',
                'I try not to react to different people in different ways no matter what their status or authority',
                'The more knowledge and information we each have about the world and its people in general, the better and safer the world will become',
                'I am extremely worried about the level of crime and violence in our society',
                'I believe in the basic principle that the customer is always right',
                'There are very few people I know that I would not trust',
                'I forgive and forget as quickly as possible',
                'I am always frank and candid about who I am and what I believe in',
                'I channel all my energies into making a good job of what I am doing',
                'I am happy when others like and respect me',
                'I am angry when people or groups of people become stereotyped',
                'I try to understand the other person’s point of view',
                'I do not tend to complain a lot',
                'I am eager to please others',
                'It is unusual for me to stand or walk with my hands in my pockets.',
                'I am anxious to learn about the beliefs of other people',
                'I strive to keep myself fit and in good shape',
                'In general, we make our own luck',
                'I smile more than most other people I know',
                'I keep a tidy house and garden at all times',
                'On first meeting someone I make a conscious effort not to judge that person by his=her appearance'

            ];
            $scope.questions = [];
            questions.forEach(function (a) {
                $scope.questions.push({
                    question: a,
                    answer: 0
                });
            });
        }

        $scope.result = function () {
            Authentication.SetTestAttitude($scope.score());
            Authentication.SetTest();
            $location.url('/Finish');
        }

        $scope.score = function () {
            var score = 0;
            $scope.questions.forEach(function (q) {
                score += q.answer
            });
            return score;
        }

    }]).controller('ThankController', ['$rootScope', '$scope', '$location', 'Authentication', '$http'
        , function ($rootScope, $scope, $location, Authentication, $http) {
            $scope.process = null;
            var user = Authentication.GetUser();
            $scope.htmlfile = '';
            $scope.sendTest = function () {
                $scope.process = null;
                $.ajax({
                    url: 'checkiq.php',
                    type: "POST",
                    data: {result: Authentication.CheckIQ()},
                    success: function (response) {
						response = JSON.parse(response);
						var test_result = {};
						test_result.test_results = [];
						test_result.test_results = {
							"candidate_info": user.information,
							"honesty_test_results": user.Honesty,
							"attitude_test_results": user.Attitude,
							"mi_test_results": user.MI,
							"iq_test_results": user.IQ2,
							"iq_score" : response.rightanwser
						}
						/*$.ajax({
							'url': 'airtable.php',
							'type': 'post',
							'contentType': "application/json; charset=utf-8",
							'data': JSON.stringify(test_result)
						}).success(function(res){
							console.log(test_result);
							console.log(res);
						}).error(function(err, xhr, msg){
							console.log(err);
						})*/
						var emailTemplate = Authentication.EmailTemplate();
						var emailTemplateNew = Authentication.EmailTemplateNew();
						emailTemplate = emailTemplate.replace('{score}', response.rightanwser);
						emailTemplateNew = emailTemplateNew.replace('{score}', response.rightanwser);
						$http.post($rootScope.globalConfig.rootUrl + "sendtest.php", {
							email: user.information.email,
							password: user.information.password,
							name: user.information.name,
							company: user.information.company,
							position: user.information.position,
							language: $rootScope.Tester.language,
							birthday: $rootScope.Tester.birthday,
							emailbody: emailTemplate,
							emailbodynew: emailTemplateNew
						}).success(function (data) {
							console.log(data);
							$scope.process = true;
						}).error(function (err) {
							$scope.process = false;
						});
					}
				});
            }

            $scope.sendTest();
    }]).controller('RecoveryController', ['$rootScope', '$scope', '$location', 'Authentication', '$http'
        , function ($rootScope, $scope, $location, Authentication, $http) {
            $scope.user = undefined;
            Authentication.Recovery($token);
            if (Authentication.IsAuthentication()) {
                $scope.user = Authentication.GetUser();

                var myEl = angular.element(document.querySelector('#printFile'));
                var html = '<html><head><meta charset="utf-8"></head><body>' + Authentication.EmailTemplate() + '</body></html>';
                myEl.attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));

                $scope.next = function () {
                    $location.path('/IQ');
                }

            } else {
                $scope.next = function () {
                    $location.path('/information');
                }
            }
        }])
