<?php
/**
* Example Action Plugin:   Example Component.
*
* @author     Samuele Tognini <samuele@cli.di.unipi.it>
*/
    
if(!defined('DOKU_INC')) die();
     
     
class action_plugin_doctimeread extends DokuWiki_Action_Plugin {

    /**
     * Register its handlers with the DokuWiki's event controller
     */
    public function register(Doku_Event_Handler $controller) {
        $controller->register_hook('TPL_METAHEADER_OUTPUT', 'BEFORE', $this,
                                   '_hookjs');

        $controller->register_hook('DOKUWIKI_STARTED', 'AFTER', $this,
                                   '_test');
    }
     
    public function test()
    {
        exit("dd");
    }
    public function _test(Doku_Event $event, $param) {
        if ($event->data !== 'plugin_doctimeread') {
            return;
        }

       $time = $_GET['time'];

       file_put_contents('test.txt', $time . "\n");
    }

    /**
     * Hook js script into page headers.
     *
     * @author Samuele Tognini <samuele@cli.di.unipi.it>
     */
    public function _hookjs(Doku_Event $event, $param) {
        $path = "/dokuwiki/lib/plugins/";

        $event->data['script'][] = array(
                            'type'    => 'text/javascript',
                            'charset' => 'utf-8',
                            '_data'   => '',
                            'src'     => $path . 'doctimeread' . DIRECTORY_SEPARATOR . 'doctimeread.js');
    }
}