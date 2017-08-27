Allow kid's church leaders to "page" parents by *quickly* flashing a number on a dedicated monitor at the front of the auditorium

NOTE: This assumes that kid's church IDs are 4 alphanumeric characters.

Do the following:

1) Install VirtualBox
2) Fire up a new Ubuntu 16.04 VM
3) Install the VirtualBox guest additions
4) Install ansible

    ```
    $ sudo apt-add-repository ppa:ansible/ansible
    $ sudo apt update
    $ sudo apt install ansible
    ```

5) Install git

    ```
    $ sudo apt install git
    ```

6) Edit your git config
    
    ```
    $ git config --global user.name "Your Name"
    $ git config --global user.email "your@playgroundsessions.com"
    ```

7) Clone this repository
    
    ```
    $ git clone https://github.com/benbankes/openlp-kids-pager.git openlp-kids-pager
    ```

8) Run the playbook

    ```
    $ cd openlp-kids-pager/ansible
    $ ansible-playbook dev.yml
    ```

9) Run the node script

    ```
    $ cd openlp-kids-pager/public
    $ node app.js
    ```

10) Add a host-only network adapter to VirtualBox to FTP or SSH into the guest from the host and retrieve the resulting custom.sqlite file 

11) Setup OpenLP following the PDF instructions (not yet) in this repository 
