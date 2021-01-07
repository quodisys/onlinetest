QuodisysApp.filter('capitalize', function() {
    return function(input) {
      return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
    }
});
QuodisysApp.controller('InformationController', ['$rootScope', '$scope', '$routeParams', '$location', '$timeout', 'Authentication', function ($rootScope, $scope, $route, $location, $timeout, Authentication) {
        $scope.Tester = {
            email: "",
            name: "",
            birthday: "",
            position: "",
            password: "",
            company: "",
            language: "",
            codelanguage:"",
            level:""
        }
        $scope.dummyTestData = [
            {
                q: 'Which are "states" in the following:',
                ca: 'B,C,G,H',
                type: 'checkbox',
                level: '',
                random: 1,
                answers: [
                    {alphabet: 'A', question: 'Read only'},
                    {alphabet: 'B', question: 'Changes can be asynchronous'},
                    {alphabet: 'C', question: 'Is mutable'},
                    {alphabet: 'D', question: 'Can be accessed by child component'},
                    {alphabet: 'E', question: 'Used to communicate between components'},
                    {alphabet: 'F', question: 'Stateless components can have___'},
                    {alphabet: 'G', question: 'Cannot make components reusable'},
                    {alphabet: 'H', question: 'Is internal & controlled by the component'}
                ]

            },
            {
                q: 'In return statement for using render(), it can have only one parent___tag.',
                ca: 'D',
                type: 'radio',
                level: 'M',
                random: 2,
                answers: [
                    {alphabet: 'A', question: 'CSS'},
                    {alphabet: 'B', question: 'File'},
                    {alphabet: 'C', question: 'Meta'},
                    {alphabet: 'D', question: 'HTML'},
                    {alphabet: 'E', question: 'JS'},
                    {alphabet: 'F', question: 'Stateless components can have___'},
                    {alphabet: 'G', question: 'Cannot make components reusable'},
                    {alphabet: 'H', question: 'Is internal & controlled by the component'}
                ]

            },
            {
                q: 'Which are "stateful" components in the following:',
                ca: 'B,E,F',
                type: 'checkbox',
                level: 'H',
                random: 3,
                answers: [
                    {alphabet: 'A', question: 'Components do not hold or manage state'},
                    {alphabet: 'B', question: 'It can contain the knowledge of past, current, and possible future changes in state'},
                    {alphabet: 'C', question: 'Known as a functional component'},
                    {alphabet: 'D', question: 'It does not work with any lifecycle method of React'},
                    {alphabet: 'E', question: 'Components can be reused'},
                    {alphabet: 'F', question: 'It also a class component'},
                    {alphabet: 'G', question: 'Cannot make components reusable'},
                    {alphabet: 'H', question: 'Is internal & controlled by the component'}
                ]

            }
        ]
        //$scope.position = $route.current.$$route.position;
		$scope.position = $route.position;
        $rootScope.Tester ={};
        $rootScope.Tester.codelanguage = '';
        $scope.invalid = {};
        $scope.isprocessing = false;
        // http get request to read CSV file content
        $scope.converttopdf = function () {
            $.ajax({
                type: "GET",
                url: 'pdfconvercall.php',
                dataType: "text",
                success: function (data) {
                    $('#download').attr('href', data).attr('download', data);
                    $scope.triggerClick = function(){
                        $('#download')[0].click();
                    }
                    $scope.triggerClick();
                },
                error: function (data) {
                },
            });
        }

        $scope.nextsteptechnicaltest = function () {
            $scope.isprocessing = true;
            $scope.invalid = {};
            $scope.invalid.message = '';
            var flagValid = true;
            if ($scope.Tester.level.trim() === "") {
                $scope.invalid.level = true;
                $scope.invalid.message = 'Please select level.';
                flagValid = false;
            }

            if ($scope.Tester.password.trim() === "") {
                $scope.invalid.password = true;
                $scope.invalid.message = 'Password empty.';
                flagValid = false;
            }

            if ($scope.Tester.email.trim() === "") {
                $scope.invalid.email = true;
                $scope.invalid.message = 'Email empty.';
                flagValid = false;
            }

            $rootScope.Tester.level = $scope.Tester.level;
            if (flagValid === false) {
                $scope.isprocessing = false;
                return;
            }
            $.ajax({
                type: "POST",
                url: '../quodisystest/csvcheckuser.php',
                data: {
                    email   : $scope.Tester.email.trim(),
                    password: $scope.Tester.password.trim(),
                    type    : 'techqds'
                },
                dataType: "text",
                success: function (data) {
                    if(data === 'false'){
                        $scope.invalid.password = true;
                        $scope.invalid.email = true;
                        $scope.invalid.message= 'Wrong email or password';
                        $scope.isprocessing = false;
                    } else if (data === 'password_used') {
                        $scope.invalid.password = true;
                        $scope.invalid.message = 'Password can only use once.';
                        $scope.isprocessing = false;
                    } else if (data === 'expired') {
                        $scope.invalid.password = true;
                        $scope.invalid.email = true;
                        $scope.invalid.message = 'Account is expired.';
                        $scope.isprocessing = false;
                    } else {
                        data = JSON.parse(data);
                        $scope.Tester.name = data.name;
                        $scope.Tester.company = data.company;
                        $rootScope.Tester = $scope.Tester;
                        Authentication.SetInformation($scope.Tester);
                        sessionStorage.setItem("company",data.company);
                        $.ajax({
                            type: "POST",
                            url: 'getquestions.php',
                            data: {codelanguage: $rootScope.Tester.codelanguage, position: $scope.position, level: $scope.Tester.level},
                            dataType: "text",
                            success: function (data) {
                                data = JSON.parse(data);
								console.log(data + " = codelang: " + $rootScope.Tester.codelanguage + " - position: " + $scope.position + " - level: " + $scope.Tester.level);
                                //$rootScope.questiondata = $scope.dummyTestData;
                                $rootScope.questiondata = data;
								$scope.$apply();
                                console.log($rootScope.questiondata);
                                $timeout(function(){
                                   $location.url('/IQ');
								},100);

                            },
                            error: function (data) {
                                console.log(data + " = codelang: " + $rootScope.Tester.codelanguage + " - position: " + $scope.position + " - level: " + $scope.Tester.level);
                                $scope.isprocessing = false;
                            },
                        });
                    };

                    $scope.$apply();
                },
                error: function (data) {
                    $scope.isprocessing = false;
                },
            });
        }
    }]).controller('BasicController', ['$rootScope', '$scope', '$interval', '$location', 'Authentication', '$filter', function ($rootScope, $scope, $interval, $location, Authentication, $filter) {
        var checkIQ = Authentication.GetTest('IQ');
        // if (checkIQ !== undefined
        //     && checkIQ !== null) {
        //     $location.url('/MI');
        // }
        //init
        $scope.alphabet = 'abcdefghijklmnopqrstuvwxyz';
        $scope.sumtime = 0;

        $scope.currentQuestion = {
            number: 1,
            index: function () {
                return $scope.currentQuestion.number - 1;
            },

            path: function () {
                return $scope.questions_url[$scope.currentQuestion.number-1];
            }
        };
        var Question = function (i, number) {
            var _ = this;
            _.questionNumber = i;
            _.questionRandomNumber = number.random;
            _.questionAnswered = null;
            _.questionask = number.q;
            _.questionAnswer = number.answers;
            _.questionType = number.type;
            _.questionRightAnswer = number.ca;
            if(number.level == '' || number.level == 'L') {
                $scope.sumtime = $scope.sumtime + 30;
            } else if (number.level == 'M'){
                $scope.sumtime = $scope.sumtime + 45;
            } else if (number.level == 'H'){
                $scope.sumtime = $scope.sumtime + 60;
            }
        }
        Question.prototype.result = function () {
            var _ = this;
            if (_.questionAnswered === null) {
                return "---n/a---";
            }

            switch (typeof _.questionAnswered) {
                case "string":
                    return _.questionAnswered;
                case "object":
                    var ps = Object.getOwnPropertyNames(_.questionAnswered);
                    var arr = [];
                    ps.forEach(function (p, i) {
                        if (_.questionAnswered[p] !== false) {
                            arr.push(_.questionAnswered[p]);
                        }
                    });
                    // Remove length of array
                    arr.splice(-1,1)
                    //=======================
                    if (arr.length == 0)
                        return "---n/a---";
                    else
                        return arr.join(",");
                    
                default:
                    return "---n/a---";
            }
        }
        var initQuestions = function () {
            //var arr = [];
            var arr_question = [];
            //var i = 1;
            var j = 1;
            $rootScope.questiondata.forEach(function(question) {
                arr_question.push(new Question(j, question));
                j++;
            });
            $scope.timer = {
                countDown: $scope.sumtime, //2699
                time: function () {
                    if ($scope.timer.countDown < 60) {
                        return $scope.timer.countDown;
                    } else {
                        var minutes = Math.floor($scope.timer.countDown / 60);
                        var seconds = $scope.timer.countDown % 60;
						if(seconds<10) seconds = 0+""+seconds;
                        return minutes + ":" + seconds;
                    }
                }
            }
            $scope.ivt = $interval(function () {
                if ($scope.timer.countDown > 0) {
                    $scope.timer.countDown--;
                } else {
                    $scope.result();
                }
            }, 1000);
            return arr_question;
        };

        $rootScope.questions = initQuestions();
        console.log($rootScope.questions)

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

            if ($rootScope.questions[$scope.currentQuestion.index()].questionAnswer === null) {
                $rootScope.questions[$scope.currentQuestion.index()].questionAnswer = [];
            }

            if (checkbox.checked) {
                $rootScope.questions[$scope.currentQuestion.index()].questionAnswer.push(value);
            } else {
                var idx = $rootScope.questions[$scope.currentQuestion.index()].questionAnswer.indexOf(value);
                if (idx > -1) {
                    $rootScope.questions[$scope.currentQuestion.index()].questionAnswer.splice(idx, 1);
                }
            }
        }
        $scope.result = function (){
            $interval.cancel($scope.ivt);
            var arr = [];
            $rootScope.randomarr = [];
            $rootScope.questions.forEach(function (question, indx) {
                arr.push(question.result())
                //$rootScope.randomarr.push(question.questionRandomNumber + ":" + question.result() + ":" + question.questionRightAnswer)
				$rootScope.randomarr.push(question.questionNumber + ":" + question.result() + ":" + question.questionRightAnswer)
            });
            console.log($rootScope.randomarr);
            Authentication.SetTestIQ(arr);
            $location.url('/Finish');
        }
        
        $scope.questionCheckbox = function(currentQuestion) {
            currentQuestion['questionAnswered'] = []
            $scope.questionSelected = [];
            $scope.questionSelected = $filter('filter')(currentQuestion.questionAnswer, {checked: true});
            $scope.questionSelected.forEach(item => {
                currentQuestion.questionAnswered.push(item.alphabet);
            });
        }
        $scope.questionRadio = function() {
            // console.log($rootScope.questions)
        }
    }]).controller('ThankController', ['$rootScope', '$scope', '$location', 'Authentication', '$http'
        , function ($rootScope, $scope, $location, Authentication, $http) {
            $scope.process = null;
            var user = Authentication.GetUser();
            var result = Authentication.CheckIQ();
            $scope.htmlfile = '';
            $scope.sendTest = function () {
                $scope.process = null;
                $.ajax({
                    url: 'checkiq.php',
                    type: "POST",
                    data: {result: $rootScope.randomarr, codelanguage: $rootScope.Tester.codelanguage, array_hard_questions: $rootScope.array_hard_questions},
                    success: function (response) {
                        response = JSON.parse(response);
                        var total_attempted = response.anwser;
                        var total_un_attempted = response.unanwser;
                        var basic_rightanwser = response.basic_rightanwser;
                        var optional_rightanwser = response.optional_rightanwser;
                        var technical = {};
                        technical.testresults = {
                            'candidate_info'        : user.information,
                            'test_answers'          : user.IQ,
                            'test_score'            : basic_rightanwser,
                            'optional_rightanwser'  : optional_rightanwser
                        }
						$.ajax({
							//'url': 'https://hooks.zapier.com/hooks/catch/448229/o3g78b7/',
							//'method': 'POST',
							'url': 'airtable.php',
							'type': 'post',
							/*'headers': {
								'Accept': 'application/json',
								'Content-Type': 'text/plain'
							},*/
							'contentType': "application/json; charset=utf-8",
							//'dataType': "json",
							//'data': JSON.stringify(technical)
							'data': JSON.stringify(technical)
						}).success(function(res){
							console.log(technical);
							console.log(res);
						}).error(function(err, xhr, msg){
							console.log(msg);
						})
						var emailTemplate = Authentication.EmailTemplate();
						$http.post($rootScope.globalConfig.rootUrl + "sendtest.php", {
							email: user.information.email,
							password: user.information.password,
							name: user.information.name,
							company: user.information.company,
							position: user.information.position,
							codelanguage: $rootScope.Tester.codelanguage,
							emailbody: emailTemplate,
							result: $rootScope.randomarr,
							total_attempted: total_attempted,
							total_un_attempted: total_un_attempted,
							basic_rightanwser: basic_rightanwser,
							optional_rightanwser:optional_rightanwser,
							questions: $rootScope.questiondata,
							level: $rootScope.Tester.level
						}).success(function (data) {
							$scope.process = true;
							console.log(data);
						}).error(function (err) {
							console.log(err);
							$scope.process = false;
						});
					}
				});
            }

            $scope.sendTest();
    }])
