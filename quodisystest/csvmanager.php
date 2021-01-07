<?php
ini_set("display_errors",1);
error_reporting(E_ALL);
class Csvmanager {

	static function get( $limit = 100 ) {

		$files = glob( "csv/*.csv" );
		//Create new file if not has file csv in folder
		if( count( $files ) == 0 ){
			$new_line = array(
				'id', 'name', 'email', 'password', 'is_active', 'submitted',
				'created_at', 'apply_at', 'result', 'pdf_patch','level',
				'language', 'birthday', 'position', 'send_mail', 'login_type' //'techqds' or 'iqqds' - make sure available login only 1 URL at 1 time
			);

			$fileName = 'listuser' . date("Ymd") . '.csv';
			$fp = fopen( 'csv/' . $fileName, 'w+');
			fputcsv($fp, $new_line);
			fclose($fp);
			$files = array( 'csv/' . $fileName );
		}
		// Descending
		rsort($files);
		// Get info
		$file = self::str_getcsv_custom( $files, $limit );

		//For new column
		foreach ($file as $key => $info) {
			if(!isset($info[7])){
				$file[$key][7] = '';
			}
			if(!isset($info[8])){
				$file[$key][8] = '';
			}
			if(!isset($info[9])){
				$file[$key][9] = '';
			}
			if(!isset($info[10])){
				$file[$key][10] = '';
			}
			if(!isset($info[11])){
				$file[$key][11] = '';
			}
			if(!isset($info[12])){
				$file[$key][12] = '';
			}
			if(!isset($info[13])){
				$file[$key][13] = '';
			}
			if(!isset($info[14])){
				$file[$key][14] = '';
			}
			if(!isset($info[15])){
				$file[$key][15] = '';
			}
		}
		rsort($file);
		return $file;
	}

	/**
	 * $limit is record limit
	 */
	static public function str_getcsv_custom( $files, $limit = 1 ) {

		$result = array();
		$count = 0;
		$limit = ( isset($limit) && $limit > 0 ) ? $limit : 1;

		foreach( $files as $file ) {

			// read file
			$csv = file( $file );
			foreach( $csv as $c ){

				// check stop read file
				if ( $count >= $limit ) break;

				$data = str_getcsv( $c );
				// check remove head for new file
				if ( $count > 0 && $data[0] == 'id' ){
					continue;
				}
				// push data
				array_push( $result, $data );

				$count ++;
			}

			// check stop read file
			if ( $count >= $limit ) break;
		}

		return $result;
	}

	/**
	 *
	 */
	static function search($search = '', $order = '', $type = '') {
		//Read file csv
		$file = self::get();
		$search = trim($search);
		if ( $search != '' ) {
			foreach ($file as $key => $info) {
				//For new column
				if (strpos(strtolower($info[1]), strtolower($search)) !== false
					|| strpos(strtolower($info[2]), strtolower($search)) !== false
						|| strpos(strtolower($info[7]), strtolower($search)) !== false) {
				} else {
					unset($file[$key]);
				}
			}
		}

		if(!empty($file)){

			rsort($file);

			foreach ($file as $key => $info) {
				//For new column
				if(!isset($info[7])){
					$file[$key][7] = '';
				}

				$csv_id[$key]			= $info[0];
				$csv_name[$key] 		= strtolower($info[1]);
				$csv_email[$key] 		= strtolower($info[2]);
				$csv_password[$key] 	= strtolower($info[3]);
				$csv_submitdate[$key] 	= 0;
				$csv_createdate[$key] 	= 0;
				$csv_expiredate[$key] 	= 0;
				if(!empty($info[5])){
					$submitdate 			= str_replace('/', '-', $info[5]);
					$csv_submitdate[$key] 	= strtotime(date('Y-m-d H:i:s', strtotime($submitdate)));
				}
				if(!empty($info[6])){
					$createdate 			= str_replace('/', '-', $info[6]);
					$csv_createdate[$key] 	= strtotime(date('Y-m-d H:i:s', strtotime($createdate)));
				}
				if(!empty($info[6])){
					$expiredate 			= str_replace('/', '-', $info[6]);
					$csv_expiredate[$key] 	= strtotime(date('Y-m-d H:i:s', strtotime('+48 hours', strtotime($expiredate))));
				}
				$csv_apply[$key] = strtolower($info[7]);
			}

			self::sSort( $file, array(
				'order'				=> $order,
				'type'				=> $type,
				'csv_id'			=> $csv_id,
				'csv_name'			=> $csv_name,
				'csv_email'			=> $csv_email,
				'csv_password'		=> $csv_password,
				'csv_submitdate'	=> $csv_submitdate,
				'csv_createdate'	=> $csv_createdate,
				'csv_expiredate'	=> $csv_expiredate,
				'csv_apply'			=> $csv_apply

			) );

		}
		return $file;
	}

	/**
	 *
	 */
	static function sSort( &$file, $data ) {
		$field = $data['csv_id'];
		switch ( $data['type'] ) {
			case 'sort_name':
				$field = $data['csv_name'];
				break;
			case 'sort_email':
				$field = $data['csv_email'];
				break;
			case 'sort_password':
				$field = $data['csv_password'];
				break;
			case 'sort_submitdate':
				$field = $data['csv_submitdate'];
				break;
			case 'sort_apply':
				$field = $data['csv_apply'];
				break;
			case 'sort_createdate':
				$field = $data['csv_createdate'];
				break;
			case 'sort_expiredate':
				$field = $data['csv_expiredate'];
				break;
		}
		// sort
		if ( $data['order'] == 'sort_asc' ){
			array_multisort( $field, SORT_ASC, $file );
		} else {
			array_multisort( $field, SORT_DESC, $file );
		}
	}

	/**
	 *
	 */
	static function checkUser ($email, $password, $loginType = 'iqqds') {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$files = glob( "../quodisystest/csv/*.csv" );
		rsort( $files );
		$today = date("Y-m-d H:i:s");
		//
		foreach( $files as $file ) {

			$arrayList 	= array();
			$array_info = array();
			$isStop 	= false;
			// read file
			$csv = file( $file );
			foreach( $csv as $c ) {

				$result = str_getcsv( $c );
				// header
				if ( is_numeric( $result[0] ) ) {
					$date 			= str_replace( '/', '-', $result[6] );
					$date_format 	= date( 'Y-m-d H:i:s', strtotime( '+48 hours', strtotime( $date ) ) );

					if ( $result[2] == $email && $result[3] == $password
						&& $result[14] == 1 // send mail
							&& $result[15] == $loginType ) {

						if ( $result[4] == 1 && $today < $date_format ) {

							$result[4] 				= 0;
							$result[14] 			= 0;
							$array_info['name'] 	= $result[1];
							$array_info['company'] 	= $result[7];

						} else if ( $result[4] == 0 ) {
							// stop
							return 'password_used';
						} else if ( $today >= $date_format ) {
							// stop
							return 'expired';
						}

						$isStop = true;
					}

				}

				// get all updated data
				array_push( $arrayList, $result );

			}

			// update new data
			if ( $isStop && count($arrayList) ) {
				$fp = fopen( $file, 'w+' );
				foreach( $arrayList as $value ){
					fputcsv( $fp, $value );
				}
				fclose( $fp );
				// stop
				return json_encode($array_info);
			}
		}

		return 'false';
	}

	/**
	 * get last ID and last total record of newest file
	 */
	static function getLast() {

		$files = glob( "csv/*.csv" );
		//Create new file if not has file csv in folder
		if( count( $files ) == 0 ){
			$new_line = array(
				'id', 'name', 'email', 'password', 'is_active', 'submitted',
				'created_at', 'apply_at', 'result', 'pdf_patch','level',
				'language', 'birthday', 'position', 'send_mail', 'login_type' //'techqds' or 'iqqds' - make sure available login only 1 URL at 1 time
			);

			$fileName = 'listuser' . date("Ymd") . '.csv';
			$fp = fopen( 'csv/' . $fileName, 'w+');
			fputcsv($fp, $new_line);
			fclose($fp);
			$files = array( 'csv/' . $fileName );
		}
		// Descending
		rsort($files);
		// Get info
		$listLastData 	= array();
		$recordTotal 	= 0;
		$lastId 		= 0;
		foreach( $files as $key => $file ) {
			// read file
			$csv = file( $file );
			foreach( $csv as $c ) {
				$data = str_getcsv( $c );
				// header
				if ( $data[0] == 'id' ) {
					continue;
				}
				// get last ID of file
				if ( $lastId < $data[0] ) {
					$lastId = $data[0];
				}
				// newest file only
				if ($key == 0) {
					$recordTotal ++;
					// push data
					array_push( $listLastData, $data );
				}
			}

			// if have got last ID
			if ( $lastId != 0 ) break;
		}

		return array(
			'lastfile'	=> $files[0],
			'total' 	=> $recordTotal,
			'lastId' 	=> $lastId,
			'lastData'	=> $listLastData
		);
	}

	/**
	 *
	 */
	static function create ($email, $password, $name, $company) {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$data = self::getLast();
		$new_line = array();
		// get last ID + 1
		$new_line[0] = $data['lastId'] + 1;
		$new_line[1] = preg_replace('/[^A-Za-z0-9\-]/', '', $name);
		$new_line[2] = $email;
		$new_line[3] = $password;
		$new_line[4] = 1;
		$new_line[5] = '';
		$new_line[6] = date("d/m/Y H:i:s");
		$new_line[7] = $company == 'checkbox_com' ? 'Compliy' : 'Quodisys';
		$new_line[8] = '';
		$new_line[9] = '';
		$new_line[10] = '';
		$new_line[11] = '';
		$new_line[12] = '';
		$new_line[13] = '';
		$new_line[14] = 1;
		$new_line[15] = 'iqqds';
		$header_line = array(
			'id', 'name', 'email', 'password', 'is_active', 'submitted',
			'created_at', 'apply_at', 'result', 'pdf_patch','level',
			'language', 'birthday', 'position', 'send_mail', 'login_type' //'techqds' or 'iqqds' - make sure available login only 1 URL at 1 time
		);
		if ( $data['total'] >= 100) {
			$fp = fopen('csv/listuser'.date("Ymd").'.csv', 'w+');
			fputcsv($fp, $header_line);
			fputcsv($fp, $new_line);
			fclose($fp);
		} else {
			$fp = fopen( $data['lastfile'], 'w+' );
			fputcsv( $fp, $header_line );
			fputcsv($fp, $new_line);
			foreach ( $data['lastData'] as $value ) {
				fputcsv($fp, $value);
			}
			fclose($fp);
		}
	}

	/**
	 *
	 */
	static function finishTechnicalTest ( $data ) {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$files = glob( "../quodisystest/csv/*.csv" );
		rsort( $files );
		//
		foreach( $files as $file ) {

			$isUpdate = false;
			$arrayList = array();
			// read file
			$csv = file( $file );
			foreach( $csv as $c ) {

				$result 	= str_getcsv( $c );

				// header
				if ( is_numeric( $result[0] ) ) {
					// check
					if ( $result[1] == $data['name'] && $result[2] == $data['email']
							&& $result[7] == $data['company'] ) {

						$result[5] 	= date('d/m/Y H:i:s');
						$result[8] 	= json_encode( array(
							$data['total_attempted'],
							$data['total_un_attempted'],
							$data['basic_rightanwser'],
							$data['optional_rightanwser']
						) );

						try {

							$json			= json_decode( $result[9], true );
							$json['tech'] 	= $data['pdf_patch'];
							$result[9] 		= json_encode( $json );

						} catch (\Exception $e) {

							$result[9] = json_encode( array( 'tech' => $data['pdf_patch'] ) );
						}

						$result[10]	= $data['level'];
						$result[14]	= 0;

						$isUpdate 	= true;
					}
				}

				// merge all updated data
				array_push( $arrayList, $result );

			}

			//
			if ( $isUpdate && count($arrayList) ) {
				$fp = fopen( $file, 'w+' );
				foreach( $arrayList as $value ){
					fputcsv( $fp, $value );
				}
				fclose( $fp );
				break;
			}
		}

		return 'finishTechnicalTest';
	}

	/**
	 *
	 */
	static function finishTest ( $data ) {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$files = glob( "csv/*.csv" );
		rsort( $files );
		//
		foreach( $files as $file ) {

			$isUpdate = false;
			$arrayList = array();
			// read file
			$csv = file( $file );
			foreach( $csv as $c ) {

				$result = str_getcsv( $c );
				// header
				if ( is_numeric( $result[0] ) ) {
					// check
					if ( $result[3] == $data['password'] && $result[2] == $data['email']
								&& $result[7] == $data['company'] ) {

						try {
							$json		= json_decode( $result[9], true );
							$json['iq'] = $data['pdf_patch'];
							$result[9] 	= json_encode( $json );
						} catch (\Exception $e) {
							$result[9] = json_encode( array( 'iq' => $data['pdf_patch'] ) );
						}

						$result[5] 		= date('d/m/Y H:i:s');
						$result[11] 	= $data['language'];
						$result[12] 	= $data['birthday'];
						$result[13] 	= preg_replace('/[^A-Za-z0-9\-]/', '', $data['position']);
						$result[14] 	= 0;

						$isUpdate 	= true;
					}
				}

				// merge data updated
				array_push( $arrayList, $result );

			}

			//
			if ( $isUpdate ) {
				$fp = fopen( $file, 'w+' );
				foreach( $arrayList as $value ){
					fputcsv( $fp, $value );
				}
				fclose( $fp );
				break;
			}
		}

		return 'finishTest';
	}

	/**
	 *
	 */
	static function resetiqtest ($id, $email, $password, $login_type = 'iqqds') {
		date_default_timezone_set('Asia/Ho_Chi_Minh');
		$files = glob( "csv/*.csv" );
		rsort( $files );
		//
		foreach( $files as $file ) {

			$isUpdate = false;
			$arrayList = array();
			// read file
			$csv = file( $file );
			foreach( $csv as $c ) {

				$result = str_getcsv( $c );
				// header
				if ( is_numeric( $result[0] ) ) {
					// check
					if ( $result[0] == $id ) {

						$result[3] 	= $password;
						$result[4] 	= '1';
						$result[6] 	= date('d/m/Y H:i:s');
						$result[14] = 1;
						$result[15] = $login_type;

						$isUpdate 	= true;
					}
				}

				// merge data updated
				array_push( $arrayList, $result );

			}

			//
			if ( $isUpdate ) {
				$fp = fopen( $file, 'w+' );
				foreach( $arrayList as $value ){
					fputcsv( $fp, $value );
				}
				fclose( $fp );
				break;
			}

		}

		return 'resetiqtest';
	}

	/**
	 *
	 */
	static function setfortechtest ($id, $email, $password) {
		return self::resetiqtest ($id, $email, $password, 'techqds');
	}

}
