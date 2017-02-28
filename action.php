<?php

if(!defined('DOKU_INC')) die();

class action_plugin_doctimeread extends DokuWiki_Action_Plugin {

    //Regist function
    public function register(Doku_Event_Handler $controller) {
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this,'_hookjs');
    }

    //Function to load a javascript file
    public function _hookjs(Doku_Event $event, $param) {
        $path = "/dokuwiki/lib/plugins/";

        $event->data['script'][] = array(
                            'type'    => 'text/javascript',
                            'charset' => 'utf-8',
                            '_data'   => '',
                            'src'     => $path . 'doctimeread' . DIRECTORY_SEPARATOR . 'doctimeread.js');
    }

}
