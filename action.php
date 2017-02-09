<?php

if(!defined('DOKU_INC')) die();

class action_plugin_doctimeread extends DokuWiki_Action_Plugin {


    public function register(Doku_Event_Handler $controller) {
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this,'_hookjs');
        $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this,'_test');
         $controller->register_hook('TOOLBAR_DEFINE', 'AFTER', $this, 'insert_button', array ());
    }
    
    public function _test(Doku_Event $event, $param) {
        if ($event->data !== 'plugin_doctimeread') {
            return;
        }

       $time = $_GET['time'];
       $day = $_GET['day'];
       file_put_contents('time.txt', $time . "\n");
    }

    public function _hookjs(Doku_Event $event, $param) {
        $path = "/dokuwiki/lib/plugins/";

        $event->data['script'][] = array(
                            'type'    => 'text/javascript',
                            'charset' => 'utf-8',
                            '_data'   => '',
                            'src'     => $path . 'doctimeread' . DIRECTORY_SEPARATOR . 'doctimeread.js');
    }

}
?>